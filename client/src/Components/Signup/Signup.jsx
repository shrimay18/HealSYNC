// // Client/src/Components/Signup/signup.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import Dropdown from '../Dropdown/Dropdown';
// import PhoneNumber from '../PhoneNumber';
// import PDFUpload from '../PdfUpload';
// import './Signup.css';

// const Signup = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const [name, setName] = useState('');
//     const [gender, setGender] = useState('');
//     const [dob, setDob] = useState('');
//     const [age, setAge] = useState('');
//     const [state, setState] = useState('');
//     const [city, setCity] = useState('');
//     const [pincode, setPincode] = useState('');
//     const [degree, setDegree] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [RegNo, setRegNo] = useState('');

//     let states = [
//         "Andhra Pradesh",
//         "Arunachal Pradesh",
//         "Assam",
//         "Bihar",
//         "Chhattisgarh",
//         "Goa",
//         "Gujarat",
//         "Haryana",
//         "Himachal Pradesh",
//         "Jammu and Kashmir",
//         "Jharkhand",
//         "Karnataka",
//         "Kerala",
//         "Madhya Pradesh",
//         "Maharashtra",
//         "Manipur",
//         "Meghalaya",
//         "Mizoram",
//         "Nagaland",
//         "Odisha",
//         "Punjab",
//         "Rajasthan",
//         "Sikkim",
//         "Tamil Nadu",
//         "Telangana",
//         "Tripura",
//         "Uttarakhand",
//         "Uttar Pradesh",
//         "West Bengal",
//         "Andaman and Nicobar Islands",
//         "Chandigarh",
//         "Dadra and Nagar Haveli",
//         "Daman and Diu",
//         "Delhi",
//         "Lakshadweep",
//         "Puducherry"
//     ];


//     let genders = [
//         "Male",
//         "Female",
//         "Other"
//     ];

//     let degrees = [
//         "MBBS",
//         "MD",
//         "MS",
//         "DM",
//         "MCh",
//         "DNB",
//         "BDS",
//         "MDS",
//         "BAMS",
//         "BHMS",
//         "BUMS",
//         "BYNS",
//         "BPT",
//         "MPT",
//         "BSc Nursing",
//         "MSc Nursing",
//         "BPharm",
//         "MPharm",
//         "PharmD",
//         "PhD",
//         "Other"
//     ];



//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("Submitting form:", { username, password }); // Log form submission data
//         try {
//             const response = await axios.post('http://localhost:3000/signup',
//                 {
//                     username: username, 
//                     password: password
//                 },
//                 { 
//                     headers : {
//                         'Content-Type': 'application/json'
//                     },    
//                 }
//             );
//             setMessage(response.data);
//         } catch (error) {
//             if (error.response) {
//                 setMessage(error.response.data);
//             } else {
//                 setMessage('Error occurred');
//             }
//         }
//     };

//     return (
        
//         <div className = "SignUp">
//             <div className="signupheader">
//                 <p>HealSYNC</p>
//             </div>
//             <div className="signup-block column">
//                 <h1>Sign Up</h1>
//                 <form className='signup-block-form'>
//                     <div className="input-doctor-name row">
//                         <div className="name-label column">
//                             <label>Name:</label>
                        
//                             <div className="input-name row">
//                                 <input
//                                     type="text"
//                                     placeholder='Dr' readonly
//                                 />
//                                 <input
//                                     type="text"
//                                     value={name}
//                                     onChange={(e) => setName(e.target.value)}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="input-username-password-confirmPassword row">
//                         <div className="input-username column">
//                             <label>Username:</label>
//                             <input
//                                 type="text"
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                             />
//                         </div>
                        
//                         <div className="input-password column">
//                             <label>Password:</label>
//                             <input
//                                 type="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                         </div>
//                         <div className="input-confirmPassword column">
//                             <label>Confirm Password:</label>
//                             <input
//                                 type="password"
//                                 value={confirmPassword}
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                             />
//                         </div>
                        
//                     </div>
//                     <div className="input-gender-dob-age row">
//                         <div className="input-gender column">
//                             <label htmlFor="gender">Gender</label>
//                             <Dropdown options={
//                                 genders
//                             } selected={
//                                 gender
//                             }
//                             setSelected={
//                                 setGender
//                             }
//                            />
//                         </div>
//                         <div className="input-dob column">
//                             <label>Date of Birth:</label>
//                             <input
//                                 type="date"
//                                 value={dob}
//                                 onChange={(e) => setDob(e.target.value)}
//                             />
//                         </div>
//                         <div className="input-age column">
//                             <label>Age:</label>
//                             <input
//                                 type="number"
//                                 min="18"
//                                 max="100"
//                                 value={age}
//                                 onChange={(e) => setAge(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                     <div className="input-state-city-pincode row">
//                         <div className="input-state column">
//                             <label>State:</label>
//                             <Dropdown options={
//                                 states
//                             } selected={
//                                 state
//                             }
//                             setSelected={
//                                 setState
//                             }
//                             />
//                         </div>
//                         <div className="input-city column">
//                             <label>City:</label>
//                             <input
//                                 type="text"
//                                 value={city}
//                                 onChange={(e) => setCity(e.target.value)}
//                             />
//                         </div>
//                         <div className="input-pincode column">
//                             <label>Pincode:</label>
//                             <input
//                                 type="number"
//                                 value={pincode}
//                                 onChange={(e) => setPincode(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                     <div className="input-email-number row">
//                         <div className="input-email column">
//                             <label>Email:</label>
//                             <input
//                                 type="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                         </div>
//                         <div className="input-phone column">
//                             <PhoneNumber />
//                         </div>
//                     </div>
//                     <div className="input-degree-uploadDegree-regNo row">
//                         <div className="input-degree column">
//                             <label>Degree:</label>
//                             <Dropdown options={
//                                 degrees
//                             } selected={
//                                 degree
//                             }
//                             setSelected={
//                                 setDegree
//                             }
//                             />
//                         </div>
//                         <div className="input-uploadDegree column">
//                             <PDFUpload />
//                         </div>
//                         <div className="input-regNo column">
//                             <label>Registration No:</label>
//                             <input
//                                 type="text"
//                                 value={RegNo}
//                                 onChange={(e) => setRegNo(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                     <div className="terms">
//                         <input type="checkbox" required />
//                         <p>By clicking Signup, you agree to our Terms and Conditions</p>
//                     </div>
//                     <button type="submit">Signup</button>
//                 </form>
//             </div>
//             {<p>{message}</p>}
//         </div>
//     );
// };

// export default Signup;

import React, { useState } from 'react';
import axios from 'axios';
import Dropdown from '../Dropdown/Dropdown';
import PhoneNumber from '../PhoneNumber';
import PDFUpload from '../PdfUpload';
import './Signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [age, setAge] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [degree, setDegree] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [RegNo, setRegNo] = useState('');

    const states = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", 
        "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", 
        "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
        "Uttarakhand", "Uttar Pradesh", "West Bengal", 
        "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli", 
        "Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"
    ];

    const genders = ["Male", "Female", "Other"];
    const degrees = [
        "MBBS", "MD", "MS", "DM", "MCh", "DNB", "BDS", "MDS", "BAMS", 
        "BHMS", "BUMS", "BYNS", "BPT", "MPT", "BSc Nursing", "MSc Nursing", 
        "BPharm", "MPharm", "PharmD", "PhD", "Other"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form:", { username, password }); // Log form submission data
        try {
            const response = await axios.post('http://localhost:3000/signup', {
                username: username, 
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMessage(response.data);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data);
            } else {
                setMessage('Error occurred');
            }
        }
    };

    return (
        <div className="SignUp">
            <div className="signupheader">
                <p>HealSYNC</p>
            </div>
            <div className="signup-block">
                <h1>Sign Up</h1>
                <form className='signup-block-form' onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="column">
                            <label>Name:</label>
                            <div className="row">
                                <input type="text" placeholder='Dr' readOnly />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your Name"
                                />
                            </div>
                        </div>
                        <div className="column">
                            <label>Username:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your Username"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your Password"
                            />
                        </div>
                        <div className="column">
                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your Password"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label>Gender:</label>
                            <Dropdown 
                                options={genders}
                                selected={gender}
                                setSelected={setGender}
                            />
                        </div>
                        <div className="column">
                            <label>Date of Birth:</label>
                            <input
                                type="date"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                            />
                        </div>
                        <div className="column">
                            <label>Age:</label>
                            <input
                                type="number"
                                min="18"
                                max="100"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="Age"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label>State:</label>
                            <Dropdown 
                                options={states}
                                selected={state}
                                setSelected={setState}
                            />
                        </div>
                        <div className="column">
                            <label>City:</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="City"
                            />
                        </div>
                        <div className="column">
                            <label>Pincode:</label>
                            <input
                                type="number"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                placeholder="Pincode"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                            />
                        </div>
                        <div className="column">
                            <label>Contact Number:</label>
                            <PhoneNumber
                                value={phone}
                                onChange={setPhone}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label>Degree:</label>
                            <Dropdown 
                                options={degrees}
                                selected={degree}
                                setSelected={setDegree}
                            />
                        </div>
                        <div className="column">
                            <PDFUpload />
                        </div>
                        <div className="column">
                            <label>Registration No:</label>
                            <input
                                type="text"
                                value={RegNo}
                                onChange={(e) => setRegNo(e.target.value)}
                                placeholder="Enter your Registration No"
                            />
                        </div>
                    </div>
                    <div className="terms">
                        <input type="checkbox" required />
                        <p>By clicking Signup, you agree to our Terms and Conditions</p>
                    </div>
                    <button type="submit">Signup</button>
                </form>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Signup;
