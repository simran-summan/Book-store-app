import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import '../index.css'

function Navbar({ query ,setQuery , color}) {

  return (
    <div className={`bg-${color} p-3 flex justify-between shadow-sm shadow-purple-200 font-serif border-b border-purple-400 hind-medium `}
    >
      <h1 className='text-2xl font-semibold text-purple-700 playwrite-cz'>Book Bazaar</h1>
      <SearchBar setQuery= {setQuery} query={query}/>
      <Link to={`/create`} className='bg-purple-400 px-5 py-1 m-1 rounded-md text-purple-100 hover:text-yellow-300 duration-300'>Add new book</Link>
    </div>
  )
}

export default Navbar
