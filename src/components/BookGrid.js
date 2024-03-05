import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './BookGrid.css';

const CustomPrevArrow = ({ onClick }) => (
  <div className="custom-arrow custom-prev-arrow" onClick={onClick}>
    <FaChevronLeft />
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div className="custom-arrow custom-next-arrow" onClick={onClick}>
    <FaChevronRight />
  </div>
);

const BookGrid = ({ books, handleBookSelect }) => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div>
      {books.length > 0 && (
        <Slider {...settings}>
          {books.map((book) => (
            <div key={book.key} className="book-item" onClick={() => handleBookSelect(book)}>
              {book.cover_i ? (
                <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`} alt="Book Cover" />
              ) : (
                <div className="no-cover">
                  <p>No cover found :(</p>
                </div>
              )}
              <p className="book-title">{book.title}</p>
              <p className="book-author">{book.author_name}</p>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default BookGrid;
