import React from "react";
// import './Header.css'
import shell from '/Users/aydanyagublu/book-recs/src/images/shell.png';


const Header = () => {
    return (
        <div className='header'>
            <a>Aydan's Book Reccomender</a>
            <div className='shell'>
                <img src={shell} alt="" className="shellpic" />
            </div>
        </div>
    )
}

export default Header


