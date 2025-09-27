import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");

  const onSearchHandler = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    navigate("/course-list/" + input.trim());
  };

  return (
    <form
      onSubmit={onSearchHandler}
      className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-300 rounded-full shadow-md overflow-hidden"
    >
      {/* Search Icon */}
      <div className="flex items-center justify-center px-4 border-r border-gray-300 h-full">
        <img
          src={assets.search_icon}
          alt="search_icon"
          className="md:w-6 w-5 h-6 md:h-6 object-contain"
        />
      </div>

      {/* Input Field */}
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="Search Courses..."
        className="flex-1 h-full px-4 text-gray-600 placeholder-gray-400 focus:outline-none text-sm md:text-base"
      />

      {/* Search Button */}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition text-white md:px-6 px-4 md:py-3 py-2 rounded-r-full font-medium text-sm md:text-base"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
