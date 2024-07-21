import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import BookContextProvider from './Context/BookContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BookContextProvider>
  <BrowserRouter>
    <App/>
  </BrowserRouter>
  </BookContextProvider>
)
