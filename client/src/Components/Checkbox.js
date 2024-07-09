import React, { useState } from 'react';
import './Checkbox.css';
const Checkbox = ({ label, checked, onChange }) => {
    return (
        <label id="checkboxcontainer">
            <input
                id="checkbox"
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <span style={{ color: 'red' , fontWeight: 'normal'}}>{label}</span>
        </label>
    );
};

export default Checkbox;
