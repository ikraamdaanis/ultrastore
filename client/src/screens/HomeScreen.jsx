import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../state'
import { Loader, Message, Meta, Paginate, Product, SearchBox } from '../components'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const HomeScreen = ({ match }) => {
  const dispatch = useDispatch()

  const keyword = match.params?.keyword?.toLowerCase()
  const pageNumber = match.params?.pageNumber

  const productList = useSelector(state => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    products?.length === 0 && dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, products, keyword, pageNumber])

  useEffect(() => {
    if (keyword || pageNumber) dispatch(listProducts(keyword, pageNumber))

    return () => {
      if (keyword || pageNumber) dispatch(listProducts())
    }
  }, [dispatch, keyword, pageNumber])

  return (
    <div className='home-screen'>
      <Meta title='Welcome to UltraStore' />
      <div className='home-screen-title'>
        {keyword ? (
          <Link className='btn btn-dark my-3' to='/'>
            Back
          </Link>
        ) : (
          <h1 className='home-screen-title-heading'>Latest Products</h1>
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
    </div>
  )
}

HomeScreen.propTypes = { match: PropTypes.object }
