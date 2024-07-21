import React from 'react';
import { Link } from 'react-router-dom';

function SearchBar({query ,setQuery}) {

  return (
    <div className="flex justify-center w-full max-w-md mx-auto">
      <div className="relative w-full">
        <Link
        to={`/search`}
        >   
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
            placeholder="Search..."
            className="w-full px-4 py-2 text-gray-700 bg-white border border-purple-400 rounded-full focus:outline-none focus:border-purple-700"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 mt-2 mr-4 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <svg
              className="w-4 h-4 mt-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M16.36 11A5.36 5.36 0 1111 5.64 5.36 5.36 0 0116.36 11z"
              ></path>
            </svg>
          </button>
          </Link>
      </div>
    </div>
  );
}

export default SearchBar;
