import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from '../../Components/Dropdown/Dropdown';
import PhoneNumber from '../../Components/PhoneNumberInput/PhoneNumber';
import './GAuthSignUp.css';
import Checkbox from '../../Components/Checkbox/Checkbox';



const Signup = () => {

    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState(''); // Initialize with default value if any
    const [dob, setDob] = useState('');
    const [age, setAge] = useState('');
    const [state, setState] = useState(''); // Initialize with default value if any
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [degree, setDegree] = useState(''); // Initialize with default value if any
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [RegNo, setRegNo] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
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
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
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
            const response = await axios.post('http://localhost:3000/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
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
                <h1>Profile</h1>
                <form className='signup-block-form' onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="column">
                            <label>Name:</label>
                            <div className="row">
                                <input type="text" id="dr" placeholder='Dr' readOnly />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label>Gender:</label>
                            <Dropdown
                                options={genders}
                                selected={gender}
                                setSelected={setGender}
                                defaultSelected="Select Gender" // Default value
                            />
                        </div>
                        <div className="column">
                            <label>Date of Birth:</label>
                            <input
                                type="date"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                id="dob"
                                required={true}
                            />
                        </div>
                        <div className="column">
                            <label>Age:</label>
                            <input
                                type="number"
                                min="18"
                                max="100"
                                value={age}
                                readOnly
                                placeholder="Age"
                                id="age"
                                required={true}
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
                                defaultSelected="Select State" // Default value
                            />
                        </div>
                        <div className="column">
                            <label>City:</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="City"
                                id="city"
                                required={true}
                            />
                        </div>
                        <div className="column">
                            <label>Pincode:</label>
                            <input
                                type="number"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                placeholder="Pincode"
                                id="pincode"
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label>Contact Number:</label>
                            <PhoneNumber
                                state={phone}
                                setState={setPhone}
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
                                defaultSelected="Select Degree" // Default value
                            />
                        </div>
                        <div className="column">
                            <label>Registration No:</label>
                            <input
                                type="text"
                                value={RegNo}
                                onChange={(e) => setRegNo(e.target.value)}
                                placeholder="Enter your Registration No"
                                required={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label>Upload your certificate:</label>
                            <input type={'file'} onChange={handleFileChange} />
                        </div>
                    </div>
                    <div>
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
            <p>{message}</p>
        </div>
    );
};

export default Signup;
