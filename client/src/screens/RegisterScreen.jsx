import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { loginAsGuest, register } from '../state'
import { Link } from 'react-router-dom'
import { FormContainer, Message, Meta } from '../components'
import { Form, Button, Row, Col } from 'react-bootstrap'

export const RegisterScreen = ({ history, location }) => {
  const dispatch = useDispatch()

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userRegister = useSelector(state => state.userRegister)
  const { loading, error, userInfo: registered } = userRegister

  useEffect(() => {
    if (userInfo || registered) history.push(redirect)
  }, [history, userInfo, redirect, registered])

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
      setMessage(null)
      dispatch(register(name, email, password))
    }
  }

  const handleClick = () => {
    dispatch(loginAsGuest())
  }

  return (
    <FormContainer>
      <Meta title='Register an Account' />
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
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
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            required
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            required
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          {loading ? 'Registering...' : 'Register'}
        </Button>
        <Button
          type='button'
          variant='primary'
          onClick={handleClick}
          style={{ marginLeft: '1rem' }}
        >
          Sign In as a guest
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

RegisterScreen.propTypes = { history: PropTypes.object, location: PropTypes.object }
