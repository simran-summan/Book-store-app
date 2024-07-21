import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './pages/Home';
import Navbar from './pages/Navbar'
import { Routes, Route } from 'react-router-dom';
import CreateBook from './pages/CreateBook';
import DeleteBook from './pages/DeleteBook';
import EditBook from './pages/EditBook';
import DetailsBook from './pages/DetailsBook';
import SearchBook from './pages/SearchBook';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/create' element={<CreateBook/>}/>
      <Route path='/delete/:id' element={<DeleteBook/>}/>
      <Route path='/edit/:id' element={<EditBook/>}/>
      <Route path='/details/:id' element={<DetailsBook />}/>
      <Route path='/search' element={<SearchBook />}/>
    </Routes>
  )
}

export default App
