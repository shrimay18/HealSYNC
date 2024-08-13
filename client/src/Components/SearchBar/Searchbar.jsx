import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Searchbar.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
        onSearch(event.target.value); // Trigger search on input change
    };

    return (
        <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} className="search-icon" aria-hidden="true" />
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search hospital"
                className="search-input"
                aria-label="Search hospital"
            />
        </div>
    );
};

export default SearchBar;