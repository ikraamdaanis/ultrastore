import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../state'
import { Loader, Message } from '../components'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, products, error } = productList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts())
    } else {
      userInfo ? history.push('/') : history.push('/login')
    }
  }, [dispatch, userInfo, history])

  const createProductHandler = () => {}

  const deleteHandler = id => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      return
    }
  }

  return (
    <>
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
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
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
                <td>{product._id}</td>
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
      )}
    </>
  )
}

ProductListScreen.propTypes = { history: PropTypes.object, match: PropTypes.object }
