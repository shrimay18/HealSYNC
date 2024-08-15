import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from '../../Components/Dropdown/Dropdown';
import PhoneNumber from '../../Components/PhoneNumberInput/PhoneNumber';
import PDFUpload from '../../Components/PDFUpload/PdfUpload';
import './Signup.css';
import Checkbox from '../../Components/Checkbox/Checkbox';
import Navbar from '../../Components/Navbar/Navbar';
import Input from '../../Components/Input/Input';

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
    const [isChecked, setIsChecked] = useState(false);
    const [file, setFile] = useState(null);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleFileChange = (file) => {
        setFile(file);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Entered password does not match');
            return;
        }
        if (age <= 18) {
            setMessage('You are not a Valid Doctor!!!!');
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
        console.log("Submitting form:", formData);
        try {
            const response = await axios.post('http://localhost:3000/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                window.location.href = response.data.redirectUrl;
            }
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
                            />
                        </div>
                        <div className="input-wrapper span-1">
                            <Input 
                                type="password"
                                value={confirmPassword}
                                setValue={setConfirmPassword}
                                label="Confirm Password"
                                required
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
                                min={18}
                                max={100}
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
                            <Input 
                                type="number"
                                value={pincode}
                                setValue={setPincode}
                                label="Pincode"
                                required
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
                            <Input 
                                type="text"
                                value={RegNo}
                                setValue={setRegNo}
                                label="Registration Number"
                                required
                            />
                        </div>
                        <div className="input-wrapper span-3">
                            <PDFUpload
                                onFileSelect={handleFileChange}
                                required={true}
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
                {message && <p className="error-message">{message}</p>}
            </div>
        </div>
    );
};

export default Signup;