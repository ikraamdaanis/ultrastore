import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../state'
import { Loader, Message, Product, SearchBox } from '../components'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const HomeScreen = ({ match }) => {
  const dispatch = useDispatch()

  const keyword = match.params?.keyword?.toLowerCase()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {keyword ? (
          <Link className='btn btn-dark my-3' to='/'>
            Back
          </Link>
        ) : (
          <h1>Latest Products</h1>
        )}
        <SearchBox />
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map(product => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

HomeScreen.propTypes = { match: PropTypes.object }
