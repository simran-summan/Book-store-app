import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../Component/SearchBar'

function Navbar({ query ,setQuery , color}) {

  return (
    <div className={`bg-${color} p-3 flex justify-between shadow-lg shadow-black font-serif border-b-2 border-purple-400 `}
    >
      <h1 className='text-2xl font-semibold text-purple-700 '>Book Store</h1>
      <SearchBar setQuery= {setQuery} query={query}/>
      <Link to={`/create`} className='bg-purple-400 px-5 py-1 m-1 rounded-md text-purple-100 hover:text-yellow-300 duration-300'>Add new book</Link>
    </div>
  )
}

export default Navbar
