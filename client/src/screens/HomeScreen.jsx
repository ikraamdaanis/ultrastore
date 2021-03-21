import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Loader, Product } from '../components'
import { listProducts } from '../redux'
import { useDispatch, useSelector } from 'react-redux'

export const HomeScreen = () => {
  const dispatch = useDispatch()

  // const [products, setProducts] = useState([])

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
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
