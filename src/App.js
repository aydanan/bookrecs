import React, { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import SelectedBook from './components/SelectedBook';
import Loader from './components/Loader';
import BookGrid from './components/BookGrid';
import BookList from './components/BookList';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subjectQuery, setSubjectQuery] = useState('');
  const [subjectBooks, setSubjectBooks] = useState([]);
  const [subjectLoading, setSubjectLoading] = useState(false);
  const [showSubjectSearch, setShowSubjectSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${query}`);
      const data = await response.json();
      setSearchResults(data.docs.slice(0, 5));
      setSelectedBook(null);
      setSubjectBooks([]);
      setShowSubjectSearch(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setSearchResults([]);
    setShowSubjectSearch(true);
  };

  const handleSubjectSearch = async () => {
    setSubjectLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/subjects/${subjectQuery}.json?published_in=1000-2024`
      );
      const data = await response.json();
      setSubjectBooks(data.works);
    } catch (error) {
      console.error('Error fetching subject data:', error);
    } finally {
      setSubjectLoading(false);
    }
  };

  const handleSubjectClick = async (subject) => {
    if (subject.trim() !== "") { // Check if the subject is not empty
      setSubjectQuery(subject.replace(/\s/g, '_').toLowerCase()); // Set subject query to the clicked subject with underscores and lowercase
      setSubjectLoading(true);
      try {
        const response = await fetch(
          `https://openlibrary.org/subjects/${subject.replace(/\s/g, '_').toLowerCase()}.json?published_in=1000-2024`
        );
        const data = await response.json();
        setSubjectBooks(data.works);
      } catch (error) {
        console.error('Error fetching subject data:', error);
      } finally {
        setSubjectLoading(false);
      }
    }
  };

  return (
    <div className="app">
      <div className="main-content">
        <div className="bulk">
          <h1 className="title">Aydan's Book Recommender</h1>
          <p className="subtitle">
            Search for a book you like using the search below. Then select a book from the grid.
          </p>
          <SearchForm query={query} setQuery={setQuery} handleSearch={handleSearch} />
          {loading ? (
            <div className="loader-container">
              <Loader className="loader" />
            </div>
          ) : (
            <div className="book-grid-container"> 
              <BookGrid books={searchResults} handleBookSelect={handleBookSelect} />
            </div>
          )}
        </div>

        {selectedBook && (
          <>
            <SelectedBook book={selectedBook} handleSubjectClick={handleSubjectClick} />
            {subjectLoading ? (
              <div className="loader-container"> {/* Adjusted margin-bottom for loader */}
                <Loader className="loader" />
              </div>
            ) : (
              Array.isArray(subjectBooks) && subjectBooks.length > 0 ? (
                <BookList books={subjectBooks} />
              ) : (
                <p>No books found for the selected subject.</p>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
