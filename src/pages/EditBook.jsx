import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BookContext } from "../Context/BookContext";
import Loader from "../Loader";
import '../index.css';
import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar";

function EditBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState(null);
  const [isbn, setIsbn] = useState("");

  const { data, setData, loading, setLoading } = useContext(BookContext);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://book-store-app-8ngn.onrender.com/api/v1/books/${id}`)
      .then((response) => {
        setLoading(false);
        const bookData = response.data.data;
        setTitle(bookData.title);
        setAuthor(bookData.author);
        setPublishYear(bookData.publishYear);
        setSummary(bookData.summary);
        setIsbn(bookData.isbn);
        setImage(bookData.image?.url);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id, setLoading]);

  const handleEditBook = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("publishYear", publishYear);
    formData.append("summary", summary);
    formData.append("isbn", isbn);
    if (image && typeof image === "object") {
      formData.append("image", image);
    }
    setLoading(true);

    axios
      .put(
        `https://book-store-app-8ngn.onrender.com/api/v1/books/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        const updatedBook = response.data; // Access the updated book data
        setData((prevBooks) =>
          Array.isArray(prevBooks)
            ? prevBooks.map((book) => (book.id === id ? updatedBook : book))
            : []
        );
        setLoading(false);
        navigate(`/details/${id}`);
        alert("Book has been updated");
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
    <Navbar color={'purple-100'}/>
    <div className="min-h-screen flex justify-center items-center p-4" style={{backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ZwYzsS_CL64KW54GK7Dj6OSgJM_831unKg&s)`,
          backdropFilter:'blur(10px)',
          backgroundSize:'cover',
          }}>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl bg-opacity-50 backdrop-filter backdrop-blur-lg">

        <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
          Edit Book Details
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
          </div>
          <div className="col-span-2">
            <label className="text-gray-700">Upload Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-2 w-full"
              />
          </div>
        </div>

        <button
          onClick={handleEditBook}
          className="bg-purple-600 text-white font-semibold px-6 py-2 rounded-md mt-6 hover:bg-purple-700 w-full duration-100"
        >
          Save Changes
        </button>
      </div>
    </div>
    <Footer/>
  </>
  );
}

export default EditBook;
