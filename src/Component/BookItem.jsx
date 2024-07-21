import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import DetailsBook from '../pages/DetailsBook'
import CreateBook from '../pages/CreateBook'

function BookItem({item}) {
  console.log(item.summary.length);
  const trimSummary=(item)=>{
    item.substring(0,50)
  }
  return (
    <Link to={`/details/${item.id}`}>
    <div>
      <div className='shadow-lg bg-purple-100 w-auto flex m-3 p-2 hover:shadow-purple-800 duration-500 rounded-lg'>
        <div className=''>
        <img src={item.image.url} alt="" className='h-60 w-[10rem]'/>
        </div>
        <div className='w-64 p-3'>
        <h1><strong>Title:</strong> {item.title}</h1>
        <h3><strong>Author:</strong> {item.author}</h3>
        <p><strong>Summary:</strong> {item.summary.length < 90 ? item.summary : item.summary.substring(0, item.summary.indexOf(' ', item.summary.length - 60)) + '...'}
        </p> 
        <span><strong>Publish year:</strong> {item.publishYear}</span>
        <p><strong>Isbn:</strong> {item.isbn}</p>
        </div>
      </div>
    </div>
        </Link>
  )
}

export default BookItem