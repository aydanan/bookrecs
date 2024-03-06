import React, { useState, useRef, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import SelectedBook from './components/SelectedBook';
import Loader from './components/Loader';
import BookGrid from './components/BookGrid';
import BookList from './components/BookList';
import Info from './components/Info';

import girl from '/Users/aydanyagublu/book-recs/src/components/images/girlbook.png'

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
  const [selectedSubject, setSelectedSubject] = useState('');
  const [subjectBooksLoaded, setSubjectBooksLoaded] = useState(false);
  const [error, setError] = useState(null); // State for handling errors

  const subjectBooksRef = useRef(null);

  useEffect(() => {
    if (subjectBooksLoaded && subjectBooksRef.current) {
      subjectBooksRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [subjectBooksLoaded]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${query}`);
      const data = await response.json();
      setSearchResults(data.docs.slice(0, 5));
      setSelectedBook(null);
      setSubjectBooks([]);
      setShowSubjectSearch(false);
      setSelectedSubject(''); 
    } catch (error) {
      setError('Error fetching data, please try again.'); // Set error state
    } finally {
      setLoading(false);
    }
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setSearchResults([]);
    setShowSubjectSearch(true);
    setSelectedSubject(''); 
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
      setError('Error fetching subject data, please try again.'); // Set error state
    } finally {
      setSubjectLoading(false);
      setSubjectBooksLoaded(true);
    }
  };

  const handleSubjectClick = async (subject) => {
    if (subject.trim() !== "") { 
      setSelectedSubject(subject); 
      setSubjectQuery(subject.replace(/\s/g, '_').toLowerCase()); 
      setSubjectLoading(true);
      try {
        const response = await fetch(
          `https://openlibrary.org/subjects/${subject.replace(/\s/g, '_').toLowerCase()}.json?published_in=1000-2024`
        );
        const data = await response.json();
        setSubjectBooks(data.works);
      } catch (error) {
        setError('Error fetching subject data, please try again.'); // Set error state
      } finally {
        setSubjectLoading(false);
        setSubjectBooksLoaded(true); 
      }
    }
  };

  return (
    <div className="app">
      <div className="girl">
        <img src={girl} alt="Girl with book" />
      </div>
      <div className="main-content">
        <div className="bulk">
          <h1 className="title">Subject-Wise Book Recommender</h1>
          <p className="subtitle">
            Have you ever read a book that you loved but you weren't sure what about it struck you? Maybe you liked it because the narrator was unreliable, maybe you liked it because it tackled themes of friendship, or maybe you just liked it because it was a fantasy genre book.
          </p>
          <p className="subtitle">
            In any case, use the search below to find a book you like and select a theme/subject/aspect. Upon doing so, you will be recommended books that share these characteristics.
          </p>
          <Info /> 
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
          <SelectedBook book={selectedBook} handleSubjectClick={handleSubjectClick} />
        )}
      </div>
      {selectedSubject && !subjectLoading && (
        <div className="subject-books" ref={subjectBooksRef}>
          <h2>Recommended Books for '{selectedSubject}'</h2>
          {error ? ( // Check if there's an error
            <p>{error}</p>
          ) : (
            Array.isArray(subjectBooks) && subjectBooks.length > 0 ? (
              <BookList books={subjectBooks} />
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default App;
