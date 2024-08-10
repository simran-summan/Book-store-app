import React, { useContext } from "react";
import { BookContext } from "../Context/BookContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";
import { GiCancel } from "react-icons/gi";

function DeleteBook({onClose }) {
  const { loading, setLoading, removeBook } = useContext(BookContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`https://book-store-app-8ngn.onrender.com/api/v1/books/${id}`)
      .then(() => {
        setLoading(false);
        removeBook(id);
        alert("Book deleted successfully!");
        navigate("/getAllBook");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Service error: ", error.response.status);
        } else if (error.request) {
          console.error("Network error: ", error.request);
        } else {
          console.error("Error: ", error.message);
        }
        setLoading(false);
      });
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={onClose}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-50 backdrop-blur"></div>
      
      {/* Modal content */}
      <div className="relative flex flex-col items-center border-2 border-purple-800 rounded-xl w-[600px] p-8 mx-auto bg-purple-100 z-10 ">
        <div className="flex w-full justify-between text-center">
          <h1 className="text-2xl text-center ml-[50px] mt-5 mb-4 pr-[2px]">
            Are you sure you want to delete this book?
          </h1>
          <span
            className="text-2xl text-purple-500 cursor-pointer mt-[-10px] mr-[-10px]"
            onClick={onClose}
          >
            <GiCancel />
          </span>
        </div>
        <button
          className="p-3 bg-purple-500 text-white m-5 w-full"
          onClick={handleDeleteBook}
        >
          Yes, delete it.
        </button>
      </div>
    </div>
  );
}

export default DeleteBook;
