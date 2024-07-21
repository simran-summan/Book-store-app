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
import ImageSlider from "../Component/ImageSlider";


function Home() {
  const { data, setData, loading, setLoading } = useContext(BookContext);
  const [error, setError] = useState(null);

  const fetchBook = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://book-store-app-8ngn.onrender.com/api/v1/books?pageNo=0&pageSize=10&sortBy=id&order=asc`
      )
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
console.log(data[0]);
 
  useEffect(() => {
    fetchBook();
  }, []);
return(
  <>
  <Navbar color={'purple-100'}/>
   <div className="m-7 min-h-screen">
    {data.length > 0 ?
    (<div>
    <ImageSlider images={data.map((data)=> data)}/> 
    </div>
    ):(
      <Loader/>
    )
  }
   </div>
  <Footer/>
  </>
)
}

export default Home;
