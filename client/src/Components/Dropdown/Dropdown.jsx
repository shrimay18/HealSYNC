import React from 'react';
import './Dropdown.css';




const Dropdown = (props) => {

    return (
        <div className="dropdown">
            <label>
                {props.label}
            </label>
            <select
                value={props.selected}
                onChange={(e) => {
                    props.setSelected(e.target.value);
                    console.log(e.target.value);
                }}
            >
                {props.options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Dropdown;