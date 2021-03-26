import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersOrders } from '../state'
import { ORDER_ALL_USERS_RESET } from '../state/constants/orderConstants'
import { Loader, Message, Meta } from '../components'
import { Table, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderAllUsers = useSelector(state => state.orderAllUsers)
  const { loading, orders, error } = orderAllUsers

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: ORDER_ALL_USERS_RESET })
    if (!userInfo) return history.push('/login')
    if (!userInfo.isAdmin) return history.push('/')

    dispatch(getAllUsersOrders())
  }, [dispatch, userInfo, history])

  return (
    <>
      <Meta title='User Orders' />
      <Row className='align-items-center'>
        <Col>
          <h1>User Orders</h1>
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
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>
                  <LinkContainer to={`/product/${order._id}`}>
                    <span>{order._id}</span>
                  </LinkContainer>
                </td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.user.name}</td>
                <td>£{order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className='btn-sm'>Details</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

OrderListScreen.propTypes = { history: PropTypes.object }
