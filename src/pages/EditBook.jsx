import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BookContext } from "../Context/BookContext";
import Loader from "../Loader";
import '../index.css'

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
    <div className="p-0 m-0 min-h-screen">

    <div className="flex flex-col rounded-lg p-32 font-sans  bg-purple-custom mx-4  absolute top-7  hover:shadow-md hover:shadow-purple-500 duration-300">
      <div class="custom-shape-divider-top-1721991327">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M1200,0H0V120H281.94C572.9,116.24,602.45,3.86,602.45,3.86h0S632,116.24,923,120h277Z" class="shape-fill"></path>
    </svg>
</div>
      <h1 className="text-4xl font-semibold text-center">Edit new book</h1>
      <div className="grid grid-cols-2 gap-x-4 m-10 gap-y-4 font-semibold">
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            className="border-2 border-gray-500 px-2 py-1 w-full my-1 rounded-md"
            onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            className="border-2 border-gray-500 px-2 py-1 w-full my-1 rounded-md"
            onChange={(e) => setAuthor(e.target.value)}
            />
        </div>
        <div>
          <label>Summary:</label>
          <input
            type="text"
            min={50}
            max={1000}
            value={summary}
            className="border-2 border-gray-500 px-2 py-1 w-[51rem] my-1 rounded-md"
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label>Publish Year:</label>
          <input
            type="number"
            value={publishYear}
            className="border-2 border-gray-500 px-2 py-1 w-full my-1 rounded-md"
            onChange={(e) => setPublishYear(e.target.value)}
            />
        </div>
        <div>
          <label>ISBN:</label>
          <input
            type="text"
            min={10}
            max={13}
            value={isbn}
            className="border-2 border-gray-500 px-2 py-1 w-full my-1 rounded-md"
            onChange={(e) => setIsbn(e.target.value)}
            />
        </div>
        <div className="flex">
        <input
          type="file"
          className="px-1 py-1 my-3 rounded-md mt-1"
          onChange={(e) => setImage(e.target.files[0])}
          />
      </div>
      <button
        className="bg-purple-500 px-3 py-1  w-[7rem] rounded-md m-auto"
        onClick={handleEditBook}
        >
        Save
      </button>
        </div>
        <div class="custom-shape-divider-bottom-1721992099">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M1200,0H0V120H281.94C572.9,116.24,602.45,3.86,602.45,3.86h0S632,116.24,923,120h277Z" class="shape-fill"></path>
    </svg>
</div>
    </div>
        </div>
  );
}

export default EditBook;
