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
      <div className='flex font-serif bg-purple-200 '>
        <div>
          {data.image && (
            <div className='w-[25rem] '>
              <img src={data.image.url} alt={data.title} className='h-[80vh] my-9 mx-24 shadow-xl shadow-black' />
            </div>
          )}
        </div>
        <div className='w-full p-32 text-xl ml-40 my-12 bg-white rounded-l-full border border-purple-400'>
          <h1 className='text-6xl bodoni-moda'>{data.title}</h1>
          <h3 className='py-6 italic w-[30rem] text-lg crimson-pro'><span className='text-lg '>By-</span> {data.author} | {data.publishYear} |   <span className='pl-2'>ISBN: {data.isbn}</span> </h3>
          <div className='baskervville-regular-bold'>Summary:</div> 
          <p className='pb-4 baskervville-regular'>{data.summary}</p>
          <div className='mt-7'>
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
