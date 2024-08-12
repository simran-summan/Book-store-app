import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Component/Navbar";
import BookItem from "../Component/BookItem";
import { BookContext } from "../Context/BookContext";
import Loader from "../Loader";
import Pagination from "../Component/Pagination";
import DropDown from "../Component/DropDown";
import Footer from "../Component/Footer";

const SearchBook = () => {
  const { data, setData, loading, setLoading } = useContext(BookContext);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [postPerPage] = useState(10);
  const [pagination, setPagination] = useState({});
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    if (query.length > 0) {
      let searchUrl = "";
      if (/^\d+$/.test(query)) {
        // If the query is all numbers, search by ISBN
        searchUrl = `https://book-store-app-8ngn.onrender.com/api/v1/books/search-by-isbn?isbn=${query}&pageNo=${currentPage}&pageSize=${postPerPage}&sortBy=${sortField}&order=${sortOrder}`;
      } else {
        // Otherwise, search by title
        searchUrl = `https://book-store-app-8ngn.onrender.com/api/v1/books/search-by-title?title=${query}&pageNo=${currentPage}&pageSize=${postPerPage}&sortBy=${sortField}&&order=${sortOrder}`;
      }

      setLoading(true);
      axios
        .get(searchUrl, { timeout: 15000 })
        .then((response) => {
          setData(response.data.data);
          setLoading(false);
          const paginationData = response.data.pagination;
          setPagination(paginationData);
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) {
            console.error("Server error: ", error.response.data);
            console.error("Error message: ", error.response.data.message);
          } else if (error.request) {
            console.error("Network error: ", error.request);
          } else {
            console.error("Error: ", error.message);
          }
        });
    } else {
      setData([]);
    }
  }, [
    query,
    currentPage,
    setData,
    setLoading,
    sortOrder,
    sortField,
    pagination.totalItems,
  ]);


  const filteredData = Array.isArray(data)
    ? (data.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.isbn.includes(query)
      ))
    : [];

  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
  };

  const sortOptions = [
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ];

  const filterOptions = [
    { value: "title", label: "Title" },
    { value: "author", label: "Author" },
    { value: "isbn", label: "ISBN" },
    { value: "publishYear", label: "Publish Year" },
  ];

  return (
    <>
      <div>
        <Navbar setQuery={setQuery} query={query} color={"purple-200"} />
        {loading ? (
          <Loader />
        ) : (
          <>
            {query && (
              <div className="flex justify-between">
                <i className=" font-sans p-5">
                  Showing results for "{query}" <br />
                  <span className="p-5">
                    {pagination.totalItems} data found
                  </span>
                </i>
                <div className="flex">
                  <DropDown
                    name="Sort in"
                    options={sortOptions}
                    onChange={setSortOrder}
                    selectedValue={sortOrder}
                  />
                  <DropDown
                    name="Filter by"
                    options={filterOptions}
                    onChange={setSortField}
                    selectedValue={sortField}
                  />
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-5 justify-center p-4 font-serif min-h-screen">
              {query.length > 0 ? (
                filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <ul key={item.id}>
                      <BookItem item={item} />
                    </ul>
                  ))
                ) : (
                  <div className="text-center text-purple-800 text-3xl font-semibold mt-9">
                    No data found...
                  </div>
                )
              ) : (
                <div className="text-center text-purple-700 text-3xl font-semibold mt-9">
                  Enter the book title or ISBN you want to search.
                </div>
              )}
            </div>
            {pagination.totalPages > 1 ? (
              <Pagination
                postPerPage={postPerPage}
                totalPage={pagination.totalPages}
                paginate={handlePageChange}
                currentPage={currentPage}
              />
            ) : null}
      <Footer/>
          </>
        )}
      </div>
    </>
  );
};

export default SearchBook;
