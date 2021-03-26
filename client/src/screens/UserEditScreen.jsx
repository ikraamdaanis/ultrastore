import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../state'
import { USER_UPDATE_RESET } from '../state/constants/userConstants'
import { Link } from 'react-router-dom'
import { FormContainer, Loader, Message, Meta } from '../components'
import { Form, Button } from 'react-bootstrap'

export const UserEditScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const userId = match.params.id

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdate = useSelector(state => state.userUpdate)
  const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = userUpdate

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState('')

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/users')
    } else {
      if (userInfo && userInfo.isAdmin) {
        if (!user || user._id !== userId) {
          dispatch(getUserDetails(userId))
        } else {
          setName(user.name)
          setEmail(user.email)
          setIsAdmin(user.isAdmin)
        }
      } else {
        history.push('/login')
      }
    }
  }, [history, user, userInfo, userId, dispatch, successUpdate])

  const submitHandler = event => {
    event.preventDefault()
    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        isAdmin,
      })
    )
  }

  return (
    <>
      <Meta title='Edit User' />
      <Link to='/admin/users' className='btn my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                required
                onChange={({ target }) => setName(target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                required
                placeholder='Enter email'
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              ></Form.Control>
            </Form.Group>
            {userInfo._id !== userId && (
              <Form.Group controlId='isAdmin'>
                <Form.Check
                  type='checkbox'
                  label='Is an admin?'
                  checked={isAdmin}
                  onChange={({ target }) => setIsAdmin(target.checked)}
                ></Form.Check>
              </Form.Group>
            )}

            <Button type='submit' variant='primary'>
              {loading ? 'Updating...' : 'Update'}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

UserEditScreen.propTypes = { history: PropTypes.object, match: PropTypes.object }
