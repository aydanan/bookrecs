import { AiOutlineInfoCircle } from 'react-icons/ai';
import React, { useState} from 'react';
import './Info.css'; 

const Info = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="info-container">
      <div className="info-header" onClick={togglePopup}>
        <span>⋆Project Details ⋆</span>
      </div>
      {showPopup && (
        <div className="popup">
          <p> This project was created by Aydan Yagublu using React.js and the Open Library API to fetch data regarding different books </p>
          <p> If any books or information related to certain books are missing, it may be due to limitations in the data provided by the Open Library API </p>
          <button onClick={togglePopup} className='buttonInfo'>Close</button>
        </div>
      )}
    </div>
  );
};

export default Info;
