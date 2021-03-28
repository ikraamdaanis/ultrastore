import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, getUserOrders } from '../state'
import { ORDER_CREATE_RESET } from '../state/constants/orderConstants'
import { Message, CheckoutSteps, Meta, Loader } from '../components'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'

export const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = cart

  const orderCreate = useSelector(state => state.orderCreate)
  const { order, success, error } = orderCreate

  const [sdkReady, setSdkReady] = useState(false)

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.onload = () => setSdkReady(true)
      document.body.appendChild(script)
    }
    if (!window.paypal) {
      addPayPalScript()
    } else {
      setSdkReady(true)
    }

    return () => dispatch({ type: ORDER_CREATE_RESET })
  }, [success, history, order, dispatch])

  const placeOrderHandler = paymentResult => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid: true,
        paidAt: Date.now(),
        paymentResult: {
          id: paymentResult.id,
          status: paymentResult.status,
          update_time: paymentResult.update_time,
          email_address: paymentResult.payer.email_address,
        },
      })
    )
    dispatch(getUserOrders())
  }

  return (
    <>
      <Meta title='Place Order' />
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} rounded fluid alt={item.name} />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x £{item.price.toFixed(2)} = £
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>£{itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>£{shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>£{taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>£{totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              {error && (
                <ListGroup.Item>
                  <Message variant='danger'>{error}</Message>
                </ListGroup.Item>
              )}
              <ListGroup.Item className='paypal'>
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={totalPrice.toFixed(2)}
                    onSuccess={placeOrderHandler}
                    style={{
                      size: 'small',
                      color: 'gold',
                      shape: 'pill',
                      label: 'pay',
                      layout: 'horizontal',
                      tagline: false,
                    }}
                  />
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

PlaceOrderScreen.propTypes = { history: PropTypes.object }
