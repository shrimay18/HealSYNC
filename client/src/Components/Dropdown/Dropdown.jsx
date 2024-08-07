// Dropdown.js
import React from 'react';
import './Dropdown.css';
const Dropdown = ({ options, selected, setSelected, defaultSelected }) => {
    return (
        <select value={selected} onChange={(e) => setSelected(e.target.value)} required={true}>
            {defaultSelected && <option value="">{defaultSelected}</option>}
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;
