import React, { useState, useContext } from "react";
import { BookContext } from "../Context/BookContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar";

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

  const handleSaveBook = () => {
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

    setError(newErrors);

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
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
    <Navbar color={'purple-200'}/>
    <div className="min-h-screen flex justify-center items-center p-4" style={{backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ZwYzsS_CL64KW54GK7Dj6OSgJM_831unKg&s)`,
          backdropFilter:'blur(10px)',
          backgroundSize:'cover'}}>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl bg-opacity-50 backdrop-filter backdrop-blur-lg">

        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
          Create New Book
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md w-full mt-1 bg-white focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter book title"
              />
            {error.title && (
              <span className="text-red-500 py-1">{error.title}</span>
            )}
          </div>
          <div>
            <label className="text-gray-700">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md w-full mt-1 bg-white focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter author name"
              />
            {error.author && (
              <span className="text-red-500 py-1">{error.author}</span>
            )}
          </div>
          <div className="col-span-2">
            <label className="text-gray-700">Summary</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md w-full mt-1 bg-white focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter book summary"
              rows="4"
              />
            {error.summary && (
              <span className="text-red-500 py-1">{error.summary}</span>
            )}
          </div>
          <div>
            <label className="text-gray-700">Publish Year</label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md w-full mt-1 bg-white focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter publish year"
              />
            {error.publishYear && (
              <span className="text-red-500 py-1">{error.publishYear}</span>
            )}
          </div>
          <div>
            <label className="text-gray-700">ISBN</label>
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md w-full mt-1 bg-white focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter ISBN number"
              />
            {error.isbn && <span className="text-red-500 py-1">{error.isbn}</span>}
          </div>
          <div className="col-span-2">
            <label className="text-gray-700">Upload Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-2 w-full"
              />
            {error.image && (
              <span className="text-red-500 py-1">{error.image}</span>
            )}
          </div>
        </div>

        <button
          onClick={handleSaveBook}
          className="bg-purple-600 text-white font-semibold px-6 py-2 rounded-md mt-6 hover:bg-purple-700 w-full duration-100"
        >
          Create Book
        </button>
      </div>
    </div>
    <Footer/>
          </>
  );
}

export default CreateBook;
