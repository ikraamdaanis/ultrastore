import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../state'
import { Loader, Message, Paginate, Product, SearchBox } from '../components'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const HomeScreen = ({ match }) => {
  const dispatch = useDispatch()

  const keyword = match.params?.keyword?.toLowerCase()
  const pageNumber = match.params?.pageNumber || 1

  const productList = useSelector(state => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

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
        <>
          <Row>
            {products.map(product => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} />
        </>
      )}
    </>
  )
}

HomeScreen.propTypes = { match: PropTypes.object }
