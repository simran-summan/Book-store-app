import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import BookItem from "../Component/BookItem";
import Navbar from "../Component/Navbar";
import DetailsBook from "./DetailsBook";
import { BookContext } from "../Context/BookContext";
import Loader from "../Loader";
import Pagination from "../Component/Pagination";
import '../index.css'
import Footer from "../Component/Footer";

function GetAllBooks() {
    const { data, setData, loading, setLoading } = useContext(BookContext);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [postPerPage, setPostPerPage] = useState(10);
    const [pagination, setPagination] = useState({});
  
  
    const fetchBook = async (pageNo) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://book-store-app-8ngn.onrender.com/api/v1/books?pageNo=${pageNo}&pageSize=${postPerPage}&sortBy=id&order=asc`
        );
        // console.log(response.data.pagination);
        const paginationData = response.data.pagination;
        setPagination(paginationData);
        setCurrentPage(paginationData.currentPage);
        // setPostPerPage(paginationData.currentItem)
        if (Array.isArray(response.data.data)) {
          setData(response.data.data);
          setLoading(false);
          setError(null);
        } else {
          console.error("Data is not an array:", response.data.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        if (error.response) {
          console.error("Service error: ", error.response.status);
          setError(error.response.status);
        } else if (error.request) {
          console.error("Network error: ", error.request);
          setError(error.request);
        } else {
          console.error("Error: ", error.message);
          setError(error.message);
        }
      }
    };
  
   
    useEffect(() => {
      fetchBook(currentPage);
    }, [currentPage]);
  
    // console.log(pagination);
  
    if (error) return <div>{error}</div>;
  
    const handlePageChange = (pageNo ) => {
      setCurrentPage(pageNo);
    };
    
    const handleCurrentPage =(currentPage)=>{
      setCurrentPage(currentPage)
    }
  
    return (
      <>
      <Navbar color={'purple-100'}/>
        <div className="hind-regular flex flex-wrap gap-5 justify-center items-center p-4 font-serif min-h-screen"
        style={{backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ZwYzsS_CL64KW54GK7Dj6OSgJM_831unKg&s)`,
          backdropFilter:'blur(10px)',
          backgroundSize:'cover'
        }}
        >
          {Array.isArray(data) &&
            data.map((item) => (
              <ul key={item.id}>
                <BookItem item={item} />
              </ul>
            ))}
        </div>
        {loading ? (
          <h1 className="text-5xl text-red-500 text-center">
            <Loader />
          </h1>
        ) : <Pagination
          postPerPage={postPerPage}
          totalPage={pagination.totalPages}
          paginate={handlePageChange}
          currentPage={currentPage}
          currentPageCount={handleCurrentPage}
          pagination={pagination}
          />} 
        <Footer/>
      </>
    )
  }

export default GetAllBooks
