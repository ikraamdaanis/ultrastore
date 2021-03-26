import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export const SearchBox = () => {
  const history = useHistory()

  const [keyword, setKeyword] = useState('')

  const submitHandler = event => {
    event.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <form onSubmit={submitHandler} autoComplete='off' className='search-form'>
      <input
        className='search-input'
        id='search'
        type='search'
        name='q'
        onChange={({ target }) => setKeyword(target.value)}
        placeholder='Search Products...'
      ></input>
      <button className='search-button' type='submit'>
        <i className='fas fa-search'></i>
      </button>
    </form>
  )
}
