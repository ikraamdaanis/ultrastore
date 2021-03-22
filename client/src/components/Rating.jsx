import React from 'react'
import PropTypes from 'prop-types'

export const Rating = ({ value, text, color = '#f8e825' }) => {
  return (
    <>
      {[1, 2, 3, 4, 5].map(index => (
        <i
          style={{ color }}
          key={index}
          className={
            value >= index
              ? 'fas fa-star'
              : value >= index - 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      ))}
      <span> {text}</span>
    </>
  )
}

Rating.propTypes = { value: PropTypes.number, text: PropTypes.string, color: PropTypes.string }
