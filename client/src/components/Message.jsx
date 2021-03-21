import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'

export const Message = ({ variant = 'info', children }) => {
  return <Alert variant={variant}>{children}</Alert>
}

Message.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node,
}
