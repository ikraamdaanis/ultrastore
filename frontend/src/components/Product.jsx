import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded' variant='light'>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant='top'
          style={{ borderRadius: '2px' }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} ${
              product.numReviews > 1 || product.numReviews < 1
                ? 'reviews'
                : 'review'
            }`}
          />
        </Card.Text>
        <Card.Text as='h3'>${product.price.toFixed(2)}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
