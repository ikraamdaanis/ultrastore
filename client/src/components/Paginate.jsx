import React from 'react'
import PropTypes from 'prop-types'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useLocation } from 'react-router-dom'

export const Paginate = ({ pages, page, isAdmin = false }) => {
  const location = useLocation()
  const path = location.pathname
  const baseURL = path.split('/page/')[0] === '/' ? '' : path.split('/page/')[0]

  if (pages <= 1) return null
  return (
    <Pagination className='justify-content-center my-3'>
      {[...Array(pages).keys()].map(pageItem => (
        <LinkContainer key={pageItem} to={`${baseURL}/page/${pageItem + 1}`}>
          <Pagination.Item active={pageItem + 1 === page}>{pageItem + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  )
}

Paginate.propTypes = {
  pages: PropTypes.number,
  page: PropTypes.number,
  isAdmin: PropTypes.bool,
}
