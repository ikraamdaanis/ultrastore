import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
// import PropTypes from 'prop-types'

export const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; UltraTech</Col>
        </Row>
      </Container>
    </footer>
  )
}

// Footer.propTypes = {
// }
