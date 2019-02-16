import React from 'react';

import './searchButton.css';


function SearchButton(props) {
    return (
        <button className="search-button" {...props}>Search</button>
    );
}


export default SearchButton;
