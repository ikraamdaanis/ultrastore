import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { clearProductDetails, listProductDetails, listProducts, updateProduct } from '../state'
import { PRODUCT_UPDATE_RESET } from '../state/constants/productConstants'
import { Link } from 'react-router-dom'
import { FormContainer, Loader, Message, Meta } from '../components'
import { Form, Button } from 'react-bootstrap'

export const ProductEditScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const productId = match.params.id

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const { success: successUpdate, error: errorUpdate } = productUpdate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      return history.push('/admin/products')
    }
    if (!userInfo) return history.push('/login')
    if (!userInfo.isAdmin) return history.push('/')
    if (!product || product._id !== productId) {
      dispatch(clearProductDetails())
      dispatch(listProductDetails(productId))
    } else {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setDescription(product.description)
    }
  }, [history, productId, dispatch, product, userInfo, successUpdate])

  const uploadFileHandler = async event => {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/uploads', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = event => {
    event.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    )
    dispatch(listProducts('', '', true))
  }

  return (
    <>
      <Meta title='Edit Product' />
      <Link to='/admin/products' className='btn my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                required
                onChange={({ target }) => setName(target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type='number'
                required
                placeholder='Enter price'
                value={price}
                onChange={({ target }) => setPrice(target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image:</Form.Label>
              <Form.Control
                type='text'
                required
                placeholder='Enter image URL'
                value={image}
                onChange={({ target }) => setImage(target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose file'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label>Brand:</Form.Label>
              <Form.Control
                type='text'
                required
                placeholder='Enter brand'
                value={brand}
                onChange={({ target }) => setBrand(target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='category'>
              <Form.Label>Category:</Form.Label>
              <Form.Control
                type='text'
                required
                placeholder='Enter category'
                value={category}
                onChange={({ target }) => setCategory(target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label>Count in Stock:</Form.Label>
              <Form.Control
                type='number'
                required
                placeholder='Enter count in stock'
                value={countInStock}
                onChange={({ target }) => setCountInStock(target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as='textarea'
                rows={6}
                required
                placeholder='Enter description'
                value={description}
                onChange={({ target }) => setDescription(target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              {loading ? 'Updating...' : 'Update'}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

ProductEditScreen.propTypes = { history: PropTypes.object, match: PropTypes.object }
