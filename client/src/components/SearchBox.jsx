import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { listProducts } from '../state'
import { useHistory, useParams } from 'react-router-dom'

export const SearchBox = () => {
  const dispatch = useDispatch()

  const history = useHistory()
  const params = useParams()

  const [keyword, setKeyword] = useState(params.keyword || '')

  const submitHandler = event => {
    event.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      dispatch(listProducts())
      history.push('/')
    }
  }

  return (
    <form onSubmit={submitHandler} autoComplete='off' className='search-form'>
      <input
        className='search-input'
        id='search'
        type='search'
        name='query'
        value={keyword}
        onChange={({ target }) => setKeyword(target.value)}
        placeholder='Search Products...'
      ></input>
      <button className='search-button' type='submit'>
        <i className='fas fa-search'></i>
      </button>
    </form>
  )
}
