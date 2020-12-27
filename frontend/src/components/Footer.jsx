import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className='mt-5 mb-3'>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; ProShop</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
