import React, { useState } from 'react';

const BookList = ({ books }) => {
  const [displayedBooks, setDisplayedBooks] = useState(5); // Initial number of books to display

  const loadMore = () => {
    setDisplayedBooks(displayedBooks + 5); // Increase the number of displayed books by 5
  };

  return (
    <div className="book-list">
      {books.slice(0, displayedBooks).map((book, index) => (
        <div key={index} className="book">
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
            alt="Book Cover"
          />
          <div>
            <h3>{book.title}</h3>
            <p>Author: {book.authors ? book.authors[0].name : 'Unknown'}</p>
          </div>
        </div>
      ))}
      {displayedBooks < books.length && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
};

export default BookList;
