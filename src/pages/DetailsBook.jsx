import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Component/Navbar';
import { BookContext } from '../Context/BookContext';
import Loader from '../Loader';
import DeleteBook from './DeleteBook';
import '../index.css'
import Footer from '../Component/Footer';

function DetailsBook() {
  const { data, setData, loading, setLoading, removeBook } = useContext(BookContext);
  const { id } = useParams();

  const [showModel , setShowModel] = useState(false)

  useEffect(() => {
    setLoading(true);
    axios.get(`https://book-store-app-8ngn.onrender.com/api/v1/books/${id}`)
      .then(response => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          console.error('Service error: ', error.response.status);
        } else if (error.request) {
          console.error('Network error: ', error.request);
        } else {
          console.error('Error: ', error.message);
        }
        setLoading(false);
      });
  }, [id, setLoading, setData]);

  if (loading) {
    return <Loader/>
  }

  if (!data) {
    return <div>No data found</div>;
  }

  return (
    <>
      <Navbar color={'white'}/>
      <div className='flex lg:flex-row  md:flex-row flex-col font-serif bg-purple-200 '>
        <div>
          {data.image && (
            <div className='lg:w-[25rem] flex justify-center'>
              <img src={data.image.url} alt={data.title} className='h-[60vh] md:h-[80vh] lg:h-[80vh] my-3 lg:my-9 mx-5 lg:ml-[12rem] md:mx-20 shadow-xl shadow-black' />
            </div>
          )}
        </div>
        <div className='w-full p-20 lg:p-32 text-xl lg:ml-40 md:ml-10 my-12 bg-white lg:rounded-l-full md:rounded-l-full border border-purple-400'>
          <h1 className='text-4xl lg:text-6xl bodoni-moda'>{data.title}</h1>
          <h3 className='py-6 italic lg:w-[30rem] text-lg crimson-pro '><span className='text-lg '>By-</span> {data.author} | {data.publishYear} |   <span className='pl-2'>ISBN: {data.isbn}</span> </h3>
          <div className='baskervville-regular-bold'>Summary:</div> 
          <p className='pb-4 baskervville-regular'>{data.summary}</p>
          <div className='mt-7 flex'>
            <Link to={`/edit/${data.id}`} className='bg-blue-200 px-5 py-2 m-1 rounded-md mr-4 hover:bg-blue-300 duration-200 baskervville-regular'>Edit</Link>
            <button onClick={()=> setShowModel(true)} className='bg-red-200 px-5 py-1 m-1 rounded-md hover:bg-red-300 duration-200 baskervville-regular'>Delete</button>
          </div>
          {showModel && <DeleteBook onClose ={() => setShowModel(false)}/>}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default DetailsBook;
