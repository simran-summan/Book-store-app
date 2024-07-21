import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BookContext } from "../Context/BookContext";
import Loader from "../Loader";

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
        setSummary(bookData.summary );
        setIsbn(bookData.isbn);
        setImage(bookData.image?.url );
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
    if (image && typeof image === 'object') {
      formData.append("image", image);
    }
    setLoading(true);

    axios
      .put(`https://book-store-app-8ngn.onrender.com/api/v1/books/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
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
    <div className="flex flex-col border-2 border-sky-200 rounded-lg w-[600px] p-9 font-mono bg-sky-100 m-auto mt-4 shadow-lg">
      <h1 className="text-2xl py-3">Edit new book</h1>
      <div className="flex flex-col ">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          className="border-2 border-gray-500 px-2 py-1 w-full my-3"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Author:</label>
        <input
          type="text"
          value={author}
          className="border-2 border-gray-500 px-2 py-1 w-full my-3"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label>Publish Year:</label>
        <input
          type="number"
          value={publishYear}
          className="border-2 border-gray-500 px-2 py-1 w-full my-3"
          onChange={(e) => setPublishYear(e.target.value)}
        />
        <label>Summary:</label>
        <input
          type="text"
          min={50}
          max={1000}
          value={summary}
          className="border-2 border-gray-500 px-2 py-1 w-full my-3"
          onChange={(e) => setSummary(e.target.value)}
        />
        <label>ISBN:</label>
        <input
          type="text"
          min={10}
          max={13}
          value={isbn}
          className="border-2 border-gray-500 px-2 py-1 w-full my-3"
          onChange={(e) => setIsbn(e.target.value)}
        />
        <label>Image:</label>
        <input
          type="file"
          className="border-2 border-gray-500 px-2 py-1 w-full my-3"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <button
        className="bg-blue-300 px-5 py-1 mt-7 m-1 rounded-md"
        onClick={handleEditBook}
      >
        Save
      </button>
    </div>
  );
}

export default EditBook;
