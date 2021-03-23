import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../redux'
import { USER_UPDATE_PROFILE_RESET } from '../redux/constants/userConstants'
import { Loader, Message } from '../components'
import { Form, Button, Row, Col } from 'react-bootstrap'

export const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    dispatch(getUserDetails('profile'))
    dispatch({ type: USER_UPDATE_PROFILE_RESET })
  }, [dispatch, success])

  useEffect(() => {
    !userInfo && history.push('/login')
    if (user?.name) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [dispatch, history, userInfo, user])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const submitHandler = event => {
    event.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        })
      )
      setPassword('')
      setConfirmPassword('')

      setTimeout(() => {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
      }, 5000)
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile updated</Message>}
        {loading ? (
          <Loader />
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={({ target }) => setName(target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={({ target }) => setConfirmPassword(target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h3>My Orders</h3>
      </Col>
    </Row>
  )
}

ProfileScreen.propTypes = { history: PropTypes.object }
