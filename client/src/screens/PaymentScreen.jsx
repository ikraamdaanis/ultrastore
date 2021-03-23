import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../state'
import { CheckoutSteps, FormContainer } from '../components'
import { Form, Button, Col } from 'react-bootstrap'

export const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) history.push('/shipping')

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const submitHandler = event => {
    event.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='paymentMethod'>
          <Form.Label as='legend'>Select method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={({ target }) => setPaymentMethod(target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

PaymentScreen.propTypes = { history: PropTypes.object }
