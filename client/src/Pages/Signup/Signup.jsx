import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from '../../Components/Dropdown/Dropdown';
import PhoneNumber from '../../Components/PhoneNumberInput/PhoneNumber';
import PDFUpload from '../../Components/PDFUpload/PdfUpload';
import './Signup.css';
import Checkbox from '../../Components/Checkbox/Checkbox';
import Navbar from '../../Components/Navbar/Navbar';
import Input from '../../Components/Input/Input';

// Inline PopUp component
const PopUp = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
    const [isChecked, setIsChecked] = useState(false);
    const [file, setFile] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState('');

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleFileChange = (file) => {
        setFile(file);
    };

    const handlePincodeChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
        setPincode(value);
    };

    const handleRegNoChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setRegNo(value);
    };

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

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    useEffect(() => {
        if (dob) {
            setAge(calculateAge(dob));
        }
    }, [dob]);

    const validateForm = () => {
        const errors = [];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!username) errors.push("Username is required");
        if (!password) errors.push("Password is required");
        else if (password.length < 8) errors.push("Password must be at least 8 characters long");
        if (!confirmPassword) errors.push("Confirm Password is required");
        if (password !== confirmPassword) errors.push("Passwords do not match");
        if (!name) errors.push("Name is required");
        if (!gender) errors.push("Gender is required");
        if (!dob) errors.push("Date of Birth is required");
        if (!state) errors.push("State is required");
        if (!city) errors.push("City is required");
        if (!pincode) errors.push("Pincode is required");
        else if (pincode.length !== 6) errors.push("Pincode must be exactly 6 digits");
        if (!email) errors.push("Email is required");
        else if (!emailRegex.test(email)) errors.push("Invalid email format");
        if (!phone) errors.push("Phone number is required");
        if (!degree) errors.push("Degree is required");
        if (!RegNo) errors.push("Registration Number is required");
        if (!isChecked) errors.push("You must accept the Terms and Conditions");
        if (age <= 18) errors.push("You must be older than 18 years to register");

        if (errors.length > 0) {
            setPopUpMessage(errors.join('\n'));
            setShowPopUp(true);
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('gender', gender);
        formData.append('dateOfBirth', dob);
        formData.append('age', age);
        formData.append('state', state);
        formData.append('city', city);
        formData.append('pincode', pincode);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('Degree', degree);
        formData.append('RegistrationNumber', RegNo);

        try {
            const response = await axios.post('https://healsync-nm7z.onrender.com/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                window.location.href = response.data.redirectUrl;
            }
        } catch (error) {
            if (error.response) {
                setPopUpMessage(error.response.data);
                setShowPopUp(true);
            } else {
                setPopUpMessage('Error occurred');
                setShowPopUp(true);
            }
        }
    };

    return (
        <div className="SignUp">
            <Navbar />
            <div className="signup-block">
                <h1>Sign Up</h1>
                <form className='signup-block-form' onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="input-wrapper span-2">
                            <label>Name:</label>
                            <div className="name-input">
                                <input type="text" id="dr" placeholder='Dr' readOnly />
                                <Input
                                    type="text"
                                    value={name}
                                    setValue={setName}
                                    placeholder="Enter your Name"
                                    required
                                />
                            </div>
                        </div>
                        <div className="input-wrapper span-dropdown">
                            <Input 
                                type="text"
                                value={username}
                                setValue={setUsername}
                                label="Username"
                                required
                            />
                        </div>
                        <div className="input-wrapper span-1">
                            <Input 
                                type="password"
                                value={password}
                                setValue={setPassword}
                                label="Password"
                                required
                                minLength={8}
                            />
                        </div>
                        <div className="input-wrapper span-1">
                            <Input 
                                type="password"
                                value={confirmPassword}
                                setValue={setConfirmPassword}
                                label="Confirm Password"
                                required
                                minLength={8}
                            />
                        </div>
                        <div className="input-wrapper span-dropdown">
                            <label>Gender:</label>
                            <Dropdown 
                                options={genders}
                                selected={gender}
                                setSelected={setGender}
                                defaultSelected="Select Gender"
                            />
                        </div>
                        <div className="input-wrapper span-1">
                            <Input 
                                type="date"
                                value={dob}
                                setValue={setDob}
                                label="Date of Birth"
                                required
                            />
                        </div>
                        <div className="input-wrapper span-1">
                            <Input
                                type="number"
                                value={age}
                                setValue={setAge}
                                label="Age"
                                min={19}
                                readOnly
                            />
                        </div>
                        <div className="input-wrapper span-dropdown">
                            <label>State:</label>
                            <Dropdown 
                                options={states}
                                selected={state}
                                setSelected={setState}
                                defaultSelected="Select State"
                            />
                        </div>
                        <div className="input-wrapper span-1">
                            <Input 
                                type="text"
                                value={city}
                                setValue={setCity}
                                label="City"
                                required
                            />
                        </div>
                        <div className="input-wrapper span-1">
                            <label>Pincode:</label>
                            <input 
                                type="text"
                                value={pincode}
                                onChange={handlePincodeChange}
                                placeholder="Enter Pincode"
                                required
                                maxLength={6}
                                pattern="\d{6}"
                                title="Pincode must be exactly 6 digits"
                            />
                        </div>
                        <div className="input-wrapper span-dropdown">
                            <Input
                                type="email"
                                value={email}
                                setValue={setEmail}
                                label="Email"
                                required
                            />
                        </div>
                        <div className="input-wrapper span-1">
                            <label>Contact Number:</label>
                            <PhoneNumber
                                state={phone}
                                setState={setPhone}
                            />
                        </div>
                        <div className="input-wrapper span-1">
                            <label>Degree:</label>
                            <Dropdown 
                                options={degrees}
                                selected={degree}
                                setSelected={setDegree}
                                defaultSelected="Select Degree"
                            />
                        </div>
                        <div className="input-wrapper span-3">
                            <label>Registration Number:</label>
                            <input 
                                type="text"
                                value={RegNo}
                                onChange={handleRegNoChange}
                                placeholder="Enter Registration Number"
                                required
                                pattern="\d+"
                                title="Registration Number must be an integer"
                            />
                        </div>
                        <div className="input-wrapper span-3">
                            <label>Upload PDF:</label>
                            <PDFUpload
                                onFileSelect={handleFileChange}
                            />
                        </div>
                    </div>
                    <div className="terms">
                        <Checkbox
                            label="Accept Terms and Conditions"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            required={true}
                        />
                    </div>
                    <button type="submit">Signup</button>
                </form>
            </div>
            {showPopUp && (
                <PopUp 
                    message={popUpMessage} 
                    onClose={() => setShowPopUp(false)} 
                />
            )}
        </div>
    );
};

export default Signup;