import React from 'react';
import './Dropdown.css';




const Dropdown = ({ options, selected, setSelected }) => {

    return (
        <div className="dropdown">
            <select
                value={selected}
                onChange={(e) => {
                    setSelected(e.target.value);
                    console.log(e.target.value);
                }}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Dropdown;