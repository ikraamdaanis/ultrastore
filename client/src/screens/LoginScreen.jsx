import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux'
import { Link } from 'react-router-dom'
import { FormContainer, Message, Loader } from '../components'
import { Form, Button, Row, Col } from 'react-bootstrap'

export const LoginScreen = ({ history, location }) => {
  const dispatch = useDispatch()

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    userInfo && history.push(redirect)
  }, [history, userInfo, redirect])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = event => {
    event.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={submitHandler}>
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
        <Button type='submit' variant='primary'>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

LoginScreen.propTypes = { history: PropTypes.object, location: PropTypes.object }
