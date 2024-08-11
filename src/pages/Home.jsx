import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../Component/Navbar";
import { BookContext } from "../Context/BookContext";
import Loader from "../Loader";
import '../index.css'
import Footer from "../Component/Footer";
import ImageSlider from "../Component/ImageSlider";
import HomeSlider from "../Component/HomeSlider";
import bgImage from '../assets/bgHome.jpg'


function Home() {
  const { data, setData, loading, setLoading } = useContext(BookContext);
  const [error, setError] = useState(null);

  const fetchBook = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://book-store-app-8ngn.onrender.com/api/v1/books?pageNo=6&pageSize=10&sortBy=id&order=asc`
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
  <div className="overflow-x-hidden">
  <Navbar color={'purple-100'}/>
   <div className="min-h-screen" style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      opacity:'0.9'
    }}>
    {data.length > 0 ?
    (<div >
    <ImageSlider images={data.map((data)=> data)}/> 
    </div>
    ):(
      <Loader/>
    )
  }
   </div>
   {data.length > 0 ?
    (<div >
      <HomeSlider images={data.map((data)=> data)}/> 
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
