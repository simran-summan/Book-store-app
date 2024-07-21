import React, { useState, useContext } from "react";
import { BookContext } from "../Context/BookContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import bgImage from '../assets/pexels-designecologist-1392854.jpg'

function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState(null);
  const [isbn, setIsbn] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const { loading, setLoading } = useContext(BookContext);

  const handleSavaBook = () => {

    const newErrors = {};

    if (!title) newErrors.title = "* Title is required";
    if (title.length < 1 || title.length > 50)
      newErrors.title = "* Title must be between 1 to 50 characters";

    if (!author) newErrors.author = "* Author is required";
    if (author.length < 1 || author.length > 30)
      newErrors.author = "* Author must be between 1 to 30 characters";

    if (!publishYear) newErrors.publishYear = "* Publish Year is required";

    if (summary.length < 50 || summary.length > 1000) {
      newErrors.summary = "* Summary must be between 50 to 1000 characters";
    }

    if (!isbn) newErrors.isbn = "* ISBN is required";
    if (isbn.length < 10 || isbn.length > 13)
      newErrors.isbn = "* ISBN must be between 10 to 13 characters";

    // if (!image) newErrors.image = "* Image is required";

    setError(newErrors);
    console.log(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; // If there are errors, don't proceed with the request
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("publishYear", publishYear);
    formData.append("summary", summary);
    formData.append("isbn", isbn);
    if (image) {
      formData.append("image", image);
    }

    setLoading(true);

    axios
      .post(
        "https://book-store-app-8ngn.onrender.com/api/v1/books/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        setLoading(false);
        navigate("/");
        alert("Book has been created");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          console.error("Service error: ", error.response.status);
        } else if (error.request) {
          console.error("Network error: ", error.request);
        } else {
          console.error("Error: ", error.message);
        }
        navigate("/");
      });
    console.log(formData);
  };

  if (loading) {
   return <Loader/>
  }
  
  return (
    <div className="bg-purple-300 h-screen"
    style={{
      backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // opacity:'0.9'
      }}
    
    >
      
    <div className="flex flex-col rounded-lg p-32 font-sans  bg-purple-custom mx-48 py-14 absolute top-20 text-white hover:shadow-md hover:shadow-purple-500 duration-300 "
      >
      {/* <img src={bgImage} alt="" /> */}
      <h1 className="text-4xl font-semibold text-center">Create new book</h1>
      <div className="grid grid-cols-2 gap-x-4 m-10 gap-y-4 font-semibold">
        <div>
          <label>Title:</label>
         <input
          type="text"
          placeholder="Enter title"
          value={title}
          className="border-2 border-gray-500 px-2 py-1 w-full my-1 rounded-md"
          onChange={(e) => setTitle(e.target.value)}
        />
        {error.title && (
          <span className="text-red-500 py-1">{error.title}</span>
        )} 
        </div>
        
        <div>
        <label>Author:</label>
        <input
          type="text"
          placeholder="Enter author"
          value={author}
          className="border-2 border-gray-500 px-2 py-1 w-full my-1 rounded-md"
          onChange={(e) => setAuthor(e.target.value)}
        />
        {error.author && (
          <span className="text-red-500 py-1 ">{error.author}</span>
        )}  
        </div>
        <div>
         <label>Summary</label>
        <input
          type="text"
          min={50}
          max={1000}
          placeholder="Enter Summary"
          value={summary}
          className="border-2 border-gray-500 px-2 py-1 w-[51rem] my-1 rounded-md"
          onChange={(e) => setSummary(e.target.value)}
        />
        {error.summary && (
          <span className="text-red-500 py-1">{error.summary}</span>
        )} 
        </div>
        <br />
        <div>
         <label>Publish Year:</label>
        <input
          type="number"
          placeholder="Enter Publish year"
          value={publishYear}
          className="border-2 border-gray-500 px-2 py-1 w-full my-1 rounded-md"
          onChange={(e) => setPublishYear(e.target.value)}
          />
        {error.publishYear && (
          <span className="text-red-500 py-1">{error.publishYear}</span>
        )} 
        </div>
        <div>
        <label>Isbn</label>
        <input
          type="text"
          min={10}
          max={13}
          placeholder="Enter Isbn"
          value={isbn}
          className="border-2 border-gray-500 px-2 py-1 w-full my-1 rounded-md"
          onChange={(e) => setIsbn(e.target.value)}
          />
        {error.isbn && <span className="text-red-500 py-1">{error.isbn}</span>}  
        </div>
        <div className="flex">
          <div>

        <input
          type="file"
          className=" px-1 py-1 my-3 rounded-md mt-1"
          onChange={(e) => setImage(e.target.files[0])}
          />  
        {error.image && (
          <span className="text-red-500 py-1">{error.image}</span>
        )}
        </div>
        <div className="ml-[25rem]">
      <button
        className="bg-purple-500 px-3 py-1  w-[7rem] rounded-md m-auto"
        onClick={handleSavaBook}
        >
        Submit
      </button>
      </div>
        </div>
        
      </div>
    </div>
        </div>
  );
}

export default CreateBook;
