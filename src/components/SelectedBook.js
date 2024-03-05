import React, { useState, useEffect } from 'react';
import './SelectedBook.css';

const SelectedBook = ({ book, handleSubjectClick }) => {
  const [underlineWidths, setUnderlineWidths] = useState({});

  const calculateUnderlineWidths = () => {
    const widths = {};
    const subjects = document.querySelectorAll('.subject');
    subjects.forEach(subject => {
      widths[subject.textContent] = subject.offsetWidth;
    });
    setUnderlineWidths(widths);
  };

  useEffect(() => {
    calculateUnderlineWidths();
    window.addEventListener('resize', calculateUnderlineWidths);
    return () => window.removeEventListener('resize', calculateUnderlineWidths);
  }, []);

  return (
    <div className="book-container">
      <div className="book-details-container">
        <div className="book-image-container">
          <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`} alt="Book Cover" />
        </div>
        <div className="book-details">
          <h2>{book.title}</h2>
          <p>{book.author_name}</p>
          <p>Subjects:</p>
          <ul className="subject-list">
            {book.subject.map((subject, index) => (
              <li key={index} className="subject" onClick={() => handleSubjectClick(subject)}>
                {subject}
                <span
                  className="underline"
                  style={{ width: underlineWidths[subject] }}
                ></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SelectedBook;
