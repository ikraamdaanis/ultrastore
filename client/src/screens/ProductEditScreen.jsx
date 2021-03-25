import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { clearProductDetails, listProductDetails, updateProduct } from '../state'
import { PRODUCT_UPDATE_RESET } from '../state/constants/productConstants'
import { Link } from 'react-router-dom'
import { FormContainer, Loader, Message } from '../components'
import { Form, Button } from 'react-bootstrap'

export const ProductEditScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const productId = match.params.id

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = productUpdate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')

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
  }

  return (
    <>
      <Link to='/admin/products' className='btn my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading || loadingUpdate ? (
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
