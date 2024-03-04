import React from 'react';
import './SelectedBook.css';

const SelectedBook = ({ book, handleSubjectClick }) => {
  const filteredSubjects = book.subject.filter((subject) => {
    const regex = /^[a-zA-Z\s-()']+$/; 
    return regex.test(subject) && !/\d/.test(subject);
  });

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
            {filteredSubjects.map((subject, index) => (
              <li key={index} className="subject" onClick={() => handleSubjectClick(subject)}>
                {subject}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SelectedBook;
