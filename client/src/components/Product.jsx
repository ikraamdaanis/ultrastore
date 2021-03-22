import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'
import { Rating } from './Rating'
import { Link } from 'react-router-dom'

export const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body style={{ padding: '20px 2px 0' }}>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews}${product.numReviews === 1 ? ` review` : ' reviews'}`}
          />
        </Card.Text>
        <Card.Text as='h3' className='home-screen-price'>
          £{product.price.toFixed(2)}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

Product.propTypes = {
  product: PropTypes.object,
}
