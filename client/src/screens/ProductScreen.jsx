import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import { Loader, Message, Rating } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, clearProductDetails, listProductDetails } from '../state'

export const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
    return () => dispatch(clearProductDetails())
  }, [dispatch, match.params.id])

  const [qty, setQty] = useState(1)

  useEffect(() => {
    const currentItem = cartItems.find(cartItem => cartItem.product === match.params.id)
    currentItem && setQty(currentItem.qty)
  }, [cartItems, match.params.id])

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty))
    history.push('/cart')
  }

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={7}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={5}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews}${product.numReviews === 1 ? ` review` : ' reviews'}`}
                />
              </ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>£{product.price?.toFixed(2)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item className='qty-select'>
                  <Row>
                    <Col>Qty:</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={({ target }) => setQty(+target.value)}
                      >
                        {[...Array(product.countInStock).keys()].slice(0, 10).map(item => (
                          <option key={item + 1}>{item + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  )
}

ProductScreen.propTypes = { match: PropTypes.object, history: PropTypes.object }
