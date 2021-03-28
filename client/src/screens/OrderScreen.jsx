import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { ORDER_DETAILS_RESET, ORDER_DELIVER_RESET } from '../state/constants/orderConstants'
import { getOrderDetails, deliverOrder } from '../state'
import { Message, Loader, Meta } from '../components'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const OrderScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const orderId = match.params.id

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const orderDetails = useSelector(state => state.orderDetails)
  const { loading, order, error } = orderDetails

  const orderDeliver = useSelector(state => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  useEffect(() => {
    if (!userInfo) return history.push('/login')

    if (!order || order._id !== orderId || successDeliver) {
      dispatch({ type: ORDER_DETAILS_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    }
  }, [history, userInfo, dispatch, order, orderId, successDeliver])

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Meta title='Order' />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Order: {order._id}</h2>
              <p>
                <strong>Name: </strong>
                <span>{order.user.name}</span>
                <br />
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Shipping address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {new Date(order.deliveredAt).toLocaleString('en-GB')}
                </Message>
              ) : (
                <Message variant='danger'>Not delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  Paid on {new Date(order.paidAt).toLocaleString('en-GB')}
                </Message>
              ) : (
                <Message variant='danger'>Not paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} rounded fluid alt={item.name} />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={5}>
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
                  <Col>Items:</Col>
                  <Col>£{order.itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>£{order.shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>£{order.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total:</strong>
                  </Col>
                  <Col>
                    <strong>£{order.totalPrice.toFixed(2)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                    {loadingDeliver ? 'Marking as delivered' : 'Mark as delivered'}
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

OrderScreen.propTypes = { match: PropTypes.object, history: PropTypes.object }
