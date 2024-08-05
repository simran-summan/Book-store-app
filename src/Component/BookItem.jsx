import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import DetailsBook from '../pages/DetailsBook'
import CreateBook from '../pages/CreateBook'
<<<<<<< HEAD
<<<<<<< HEAD
import '../index.css'

function BookItem({item}) {
  console.log(item.summary.length);
  return (
    <Link to={`/details/${item.id}`}>
    <div className='quintessential-regular text-[1.1rem]'>
      <div className='shadow-lg bg-purple-100 w-auto flex m-3 p-2 hover:shadow-purple-800 duration-500 rounded-lg '>
=======
=======
>>>>>>> f1e6bbede6e5b704a93377ea6d08600d7f8d2ef6

function BookItem({item}) {
  return (
    <Link to={`/details/${item.id}`}>
    <div>
      <div className='shadow-lg bg-purple-100 w-auto flex m-3 p-2 hover:shadow-purple-400 duration-500'>
<<<<<<< HEAD
>>>>>>> f1e6bbe (first commit)
=======
>>>>>>> f1e6bbede6e5b704a93377ea6d08600d7f8d2ef6
        <div className=''>
        <img src={item.image.url} alt="" className='h-60 w-[10rem]'/>
        </div>
        <div className='w-64 p-3'>
        <h1><strong>Title:</strong> {item.title}</h1>
        <h3><strong>Author:</strong> {item.author}</h3>
<<<<<<< HEAD
<<<<<<< HEAD
        <p><strong>Summary:</strong> {item.summary.length < 100 ? item.summary : item.summary.substring(0, item.summary.indexOf(' ', item.summary.length - 90)) + '...'}
        </p> 
        <span><strong>Publish year:</strong> {item.publishYear}</span>
        <p><strong>Isbn:</strong> {item.isbn}</p>
=======
        <p><strong>Summary:</strong> {item.summary}</p> 
        <span><strong>Publish year:</strong> {item.publishYear}</span>
>>>>>>> f1e6bbe (first commit)
=======
        <p><strong>Summary:</strong> {item.summary}</p> 
        <span><strong>Publish year:</strong> {item.publishYear}</span>
>>>>>>> f1e6bbede6e5b704a93377ea6d08600d7f8d2ef6
        </div>
      </div>
    </div>
        </Link>
  )
}

export default BookItem