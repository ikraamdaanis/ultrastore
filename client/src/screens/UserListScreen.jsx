import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUserList } from '../state'
import { USER_DELETE_RESET, USER_LIST_RESET } from '../state/constants/userConstants'
import { Loader, Message, Meta } from '../components'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userList = useSelector(state => state.userList)
  const { loading, users, error } = userList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector(state => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUserList())
    } else {
      dispatch({ type: USER_LIST_RESET })
      userInfo ? history.push('/') : history.push('/login')
    }
    return () => dispatch({ type: USER_LIST_RESET })
  }, [dispatch, userInfo, history, successDelete])

  const deleteHandler = userId => {
    successDelete && dispatch({ type: USER_DELETE_RESET })
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId))
    }
  }

  return (
    <>
      <Meta title='Users' />
      <h1>Users</h1>
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
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer
                    to={`/admin/users/${user._id}/edit`}
                    style={{ margin: '0 0 0 1rem' }}
                  >
                    <Button className='btn-sm' title='Edit user'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                    title='Delete user'
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

UserListScreen.propTypes = { history: PropTypes.object }
