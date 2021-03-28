import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Message, Meta } from '../components'
import { ORDER_CREATE_RESET, ORDER_DETAILS_RESET } from '../state/constants/orderConstants'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../state'

export const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch()

  const productId = match.params.id
  const qty = location.search ? +location.search.split('=')[1] : 1

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    productId && dispatch(addToCart(productId, qty))
  }, [dispatch, productId, qty])

  const removeFromCartHandler = id => dispatch(removeFromCart(id))
  const checkoutHandler = () => {
    dispatch({ type: ORDER_DETAILS_RESET })
    dispatch({ type: ORDER_CREATE_RESET })
    history.push('/login?redirect=shipping')
  }

  return (
    <Row className='cart-screen'>
      <Meta title='Shopping Cart' />
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty.{' '}
            <span className='go-back' onClick={() => history.goBack()}>
              Go back
            </span>
          </Message>
        ) : (
          <ListGroup>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row className='cart-item'>
                  <Col md={2}>
                    <Link to={`/product/${item.product}`}>
                      <Image src={item.image} alt={item.name} fluid rounded />{' '}
                    </Link>
                  </Col>
                  <Col md={4}>
                    <Link to={`/product/${item.product}`} className='cart-item-name'>
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>£{item.price.toFixed(2)}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={({ target }) => dispatch(addToCart(item.product, +target.value))}
                    >
                      {[...Array(item.countInStock).keys()].slice(0, 10).map(item => (
                        <option key={item + 1}>{item + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <span
                      className='trash'
                      type='button'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Remove
                    </span>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>£
              {cartItems.reduce((acc, item) => acc + +item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

CartScreen.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
}
