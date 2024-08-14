import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import '../index.css'

function Navbar({ query ,setQuery , color}) {

  return (
    <div className={`bg-${color} p-3 flex justify-between shadow-sm shadow-purple-200 font-serif border-b border-purple-400 hind-medium w-full`}
    >
      <Link to={`/`} className='text-sm xl:text-2xl baskervville-regular font-semibold text-purple-700 hover:text-purple-500'>Book Bazaar</Link>
      <SearchBar setQuery= {setQuery} query={query}/>
      <Link to={`/create`} className='text-xs md:text-sm lg:text-sm bg-purple-400 px-1 xl:px-5 py-2 lg:py-2 m-1 rounded-md text-purple-100 hover:text-yellow-300 duration-300 text-nowrap'>Create book</Link>
    </div>
  )
}

export default Navbar
