import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'

const Footer = () => {
  return (
    <footer className="bg-purple-600 text-white py-6  w-full hind-regular ">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="mb-4 md:mb-0 p-2">
          <Link to={`/`} className="text-2xl font-bold hover:text-purple-200 duration-400">Book Bazaar</Link>
          <p className="text-lg w-[25rem] mt-4 kiwi-maru-regular">Welcome to Book Bazaar, the ultimate destination for book lovers and literary enthusiasts! Discover a world of stories and knowledge right at your fingertip</p>
        </div>
        <div className="flex md:flex-row ml-40">
          <Link to={`/`} className="text-gray-300 hover:text-white mx-4">Home</Link>
          <Link to={`/getAllBook`} className="text-gray-300 hover:text-white mx-4">All books</Link>
          <Link to={`/create`} className="text-gray-300 hover:text-white mx-4">Add a book</Link>
          <Link to={`/search`} className="text-gray-300 hover:text-white mx-4">Search for a book</Link>
        </div>
        <div className='ml-56 pt-3'>
          <p>Call : 90501xxx10</p>
          <p>Email : cs@bookbaazar.com</p>
        </div>
      </div>
        <div className="mt-4 md:mt-0 text-center">
          <p className="text-sm text-gray-200">&copy; {new Date().getFullYear()} Book Bazaar. All rights reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;
