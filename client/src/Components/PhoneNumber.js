// import React, { useState } from 'react';
// import 'react-phone-input-2/lib/style.css';
// import PhoneInput from 'react-phone-input-2';

// const PhoneNumberInput = () => {
//   const [phone, setPhone] = useState('');

//   return (
//     <div>
//       <label htmlFor="phone">Phone Number:</label>
//       <PhoneInput
//         country={'us'}
//         value={phone}
//         onChange={phone => setPhone(phone)}
//         inputProps={{
//           name: 'phone',
//           required: true,
//           autoFocus: true
//         }}
//       />
//     </div>
//   );
// };

// export default PhoneNumberInput;
import React, { useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import './phoneNumber.css';

const PhoneNumberInput = () => {
  const [phone, setPhone] = useState('');

  return (
    <div className="phone-number">
      <PhoneInput
        country={'in'}
        value={phone}
        onChange={phone => setPhone(phone)}
        inputProps={{
          name: 'phone',
          required: true,
          autoFocus: true
        }}
        containerClass="phone-input-container"
        inputClass="phone-input"
        buttonClass="country-code"
      />
    </div>
  );
};

export default PhoneNumberInput;
