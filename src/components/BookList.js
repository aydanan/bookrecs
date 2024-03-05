import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './BookList.css';

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

const BookList = ({ books }) => {
  const numSlidesToShow = books.length > 4 ? 4 : books.length; // Adjust the number of slides based on the number of books
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: numSlidesToShow,
    slidesToScroll: 2,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    // dots: true,
  };

  return (
    <div>
      {books.length > 0 && (
        <Slider {...settings}>
          {books.map((book, index) => (
            <div key={index} className="book">
              {book.cover_id ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                  alt="Book Cover"
                />
              ) : (
                <div className="no-cover">No cover found :(</div>
              )}
              <div>
                <h3>{book.title}</h3>
                <p>{book.authors ? book.authors[0].name : 'Unknown'}</p>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default BookList;
