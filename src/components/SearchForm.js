import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchForm.css';

const SearchForm = ({ query, setQuery, handleSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-form-container">
      <span className="search-icon">
        <FaSearch />
      </span>
      <div className="search-form">
      <input
        type="text"
        placeholder="Search for a book"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      </div>
    </div>
  );
};

export default SearchForm;
