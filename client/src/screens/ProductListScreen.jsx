import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, deleteProduct, listProducts } from '../state'
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../state/constants/productConstants'
import { Loader, Message, Meta, Paginate } from '../components'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const pageNumber = match.params?.pageNumber

  const productListAdmin = useSelector(state => state.productListAdmin)
  const { loading, products, error, page, pages } = productListAdmin

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productCreate = useSelector(state => state.productCreate)
  const {
    loading: loadingCreate,
    success: successCreate,
    product: createdProduct,
    error: errorCreate,
  } = productCreate

  const productDelete = useSelector(state => state.productDelete)
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete

  useEffect(() => {
    if (!userInfo) return history.push('/login')
    if (!userInfo.isAdmin) return history.push('/')
  }, [userInfo, history])

  useEffect(() => {
    products?.length === 0 && dispatch(listProducts('', pageNumber, true))
  }, [products, dispatch, pageNumber])

  useEffect(() => {
    if (successCreate) return history.push(`/admin/products/${createdProduct._id}/edit`)
    if (successDelete) dispatch(listProducts('', pageNumber, true))
    return () => {
      successDelete && dispatch({ type: PRODUCT_DELETE_RESET })
    }
  }, [successCreate, successDelete, history, dispatch, createdProduct, pageNumber])

  useEffect(() => {
    createdProduct && dispatch({ type: PRODUCT_CREATE_RESET })
    if (!loading && !products.length) return history.push(`/admin/products`)
  }, [loading, dispatch, history, createdProduct, products])

  useEffect(() => {
    if (pageNumber) dispatch(listProducts('', pageNumber, true))
  }, [dispatch, pageNumber])

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  const deleteHandler = id => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id))
    }
  }

  return (
    <>
      <Meta title='Product List' />
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading || loadingCreate || loadingDelete ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>
                    <LinkContainer to={`/product/${product._id}`}>
                      <span>{product._id}</span>
                    </LinkContainer>
                  </td>
                  <td>{product.name}</td>
                  <td>£{product.price.toFixed(2)}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer
                      to={`/admin/products/${product._id}/edit`}
                      style={{ margin: '0 0 0 1rem' }}
                    >
                      <Button className='btn-sm' title='Edit product'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                      title='Delete product'
                      style={{ margin: '0 0 0 1rem' }}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin />
        </>
      )}
    </>
  )
}

ProductListScreen.propTypes = { history: PropTypes.object, match: PropTypes.object }
