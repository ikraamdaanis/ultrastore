import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

export const Meta = ({
  title = 'UltraStore',
  description = 'UltraStore, find the best tech products.',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Helmet>
  )
}

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}
