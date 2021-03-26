import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import { Loader, Message, Meta, Rating } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { PRODUCT_CREATE_REVIEW_RESET } from '../state/constants/productConstants'
import { addToCart, clearProductDetails, createProductReview, listProductDetails } from '../state'

export const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productCreateReview = useSelector(state => state.productCreateReview)
  const { success: successReview, error: errorReview } = productCreateReview

  useEffect(() => {
    if (successReview) {
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(match.params.id))
    return () => dispatch(clearProductDetails())
  }, [dispatch, successReview, match.params.id])

  const [qty, setQty] = useState(1)

  useEffect(() => {
    const currentItem = cartItems?.find(cartItem => cartItem.product === match.params.id)
    currentItem && setQty(currentItem.qty)
  }, [cartItems, match.params.id])

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty))
    history.push('/cart')
  }

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const ratings = [
    { number: 1, verdict: 'Terrible' },
    { number: 2, verdict: 'Poor' },
    { number: 3, verdict: 'Okay' },
    { number: 4, verdict: 'Good' },
    { number: 5, verdict: 'Excellent' },
  ]

  const addProductReviewHandler = event => {
    event.preventDefault()
    dispatch(createProductReview(match.params.id, { rating, comment }))
  }

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <Row>
            <Col md={7} style={{ minWidth: '50%' }}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={5}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews}${
                      product.numReviews === 1 ? ` review` : ' reviews'
                    }`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>£{product.price?.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item className='qty-select'>
                    <Row>
                      <Col>Qty:</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={({ target }) => setQty(+target.value)}
                        >
                          {[...Array(product.countInStock).keys()].slice(0, 10).map(item => (
                            <option key={item + 1}>{item + 1}</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6} style={{ marginTop: '2rem' }}>
              <h2>Reviews</h2>
              {errorReview && <Message variant='danger'>{errorReview}</Message>}
              {product.reviews.length === 0 ? (
                <Message>No reviews</Message>
              ) : (
                <ListGroup variant='flush'>
                  {product.reviews.map(review => (
                    <ListGroup.Item key={review._id}>
                      <p>
                        <strong>{review.name}</strong>
                      </p>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
              <ListGroup.Item>
                <h2>Write a Customer Review</h2>
                {userInfo ? (
                  <Form onSubmit={addProductReviewHandler}>
                    <Form.Group controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as='select'
                        value={rating}
                        onChange={({ target }) => setRating(target.value)}
                      >
                        <option value=''>Select...</option>
                        {ratings.map(({ number, verdict }) => (
                          <option key={number} value={number}>
                            {`${number} - ${verdict}`}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as='textarea'
                        row='3'
                        value={comment}
                        onChange={({ target }) => setComment(target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button type='submit'>Add Review</Button>
                  </Form>
                ) : (
                  <Message>
                    Please <Link to='/login'>sign in</Link> to write a review.
                  </Message>
                )}
              </ListGroup.Item>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

ProductScreen.propTypes = { match: PropTypes.object, history: PropTypes.object }
