import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Message } from '../components'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart } from '../redux'

export const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch()

  const productId = match.params.id
  const qty = location.search ? +location.search.split('=')[1] : 1

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    productId && dispatch(addToCart(productId, qty))
  }, [dispatch, productId, qty])

  return <>{}</>
}

CartScreen.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
}
