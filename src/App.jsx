import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './pages/Home';
<<<<<<< HEAD
import Navbar from './Component/Navbar'
=======
import Navbar from './pages/Navbar'
>>>>>>> f1e6bbede6e5b704a93377ea6d08600d7f8d2ef6
import { Routes, Route } from 'react-router-dom';
import CreateBook from './pages/CreateBook';
import DeleteBook from './pages/DeleteBook';
import EditBook from './pages/EditBook';
import DetailsBook from './pages/DetailsBook';
import SearchBook from './pages/SearchBook';
<<<<<<< HEAD
import GetAllBooks from './pages/GetAllBooks';
=======
>>>>>>> f1e6bbede6e5b704a93377ea6d08600d7f8d2ef6

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
<<<<<<< HEAD
      <Route path='/getAllBook' element={<GetAllBooks/>}/>
=======
>>>>>>> f1e6bbede6e5b704a93377ea6d08600d7f8d2ef6
      <Route path='/create' element={<CreateBook/>}/>
      <Route path='/delete/:id' element={<DeleteBook/>}/>
      <Route path='/edit/:id' element={<EditBook/>}/>
      <Route path='/details/:id' element={<DetailsBook />}/>
      <Route path='/search' element={<SearchBook />}/>
    </Routes>
  )
}

export default App
