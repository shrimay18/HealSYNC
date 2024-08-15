import React from 'react';

function Input({
    type = 'text',
    value,
    setValue,
    label,
    placeholder,
    min,
    max,
    required,
    readOnly
}) {
    const handleChange = (e) => {
        const newValue = e.target.value;
        if (type === 'number' && (newValue < min || newValue > max)) {
            // Do nothing if the value is out of range
            return;
        }
        setValue(newValue);
    };

    return (
        <div className={`column ${label}`}>
            {label && <label>{label}</label>}
            <input
                type={type}
                value={value}
                onChange={handleChange}
                placeholder={placeholder || (label ? `Enter ${label}` : '')}
                min={min}
                max={max}
                required={required}
                readOnly={readOnly}
            />
        </div>
    );
}

export default Input;