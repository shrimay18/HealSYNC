import React, { useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import './phoneNumber.css';

const PhoneNumberInput = ({state, setState}) => {

    const handleChange = (e) => {
        setState(e);
    }

  return (
    <div className="phone-number">
      <PhoneInput
        country={'in'}
        value={state}
        onChange={(e) => handleChange(e)}
        inputProps={{
          name: 'phone',
          required: true,
          autoFocus: true
        }}
        containerClass="phone-input-container"
        inputClass="phone-input"
        buttonClass="country-code"
        required={true}
      />
    </div>
  );
};

export default PhoneNumberInput;
