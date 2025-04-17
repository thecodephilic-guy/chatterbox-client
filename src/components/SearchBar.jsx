import React from "react";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="relative">
      <div className="flex px-3 bg-white py-4 border-b border-gray-100">
        <div className="flex items-center bg-gray-200 rounded-md p-2 shadow-sm w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M3 11a8 8 0 1116 0 8 8 0 01-16 0z"
            />
          </svg>
          <input
            onChange={(e) => onSearchChange(e.target.value)}
            value={searchTerm}
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none ml-2 text-sm text-gray-600 w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
