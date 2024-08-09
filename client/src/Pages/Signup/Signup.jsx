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
    const [gender, setGender] = useState(''); // Initialize with default value if any
    const [dob, setDob] = useState('');
    const [age, setAge] = useState('');
    const [state, setState] = useState(''); // Initialize with default value if any
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [degree, setDegree] = useState(''); // Initialize with default value if any
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [RegNo, setRegNo] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [file, setFile] = useState(null);


    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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
        // console.log("Submitting form:", { username, password }); // Log form submission data
        // Check if password and confirm password are the same
        if (password !== confirmPassword) {
            setMessage('Entered password does not match');
            return;
        }
        if(age <= 18){
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
            if(response.data.success){
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
                    <div className="row">

                        <div className="column">
                            <label>Name:</label>
                            <div className="row">
                                <input type="text" id="dr" placeholder='Dr' readOnly />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your Name"
                                    required={true}
                                />
                            </div>
                        </div>

                        {/*Username*/}
                        <Input 
                            label="Username:"
                            type="text"
                            value={username}
                            setValue={setUsername}
                        />
                    </div>
                    <div className="row">

                        {/*Password*/}
                        <Input 
                            label="Password:"
                            type="password"
                            value={password}
                            setValue={setPassword}
                        />

                        {/*Confirm Password*/}
                        <Input 
                            label="Confirm Password:"
                            type="password"
                            value={confirmPassword}
                            setValue={setConfirmPassword}
                        />
                    </div>


                    <div className="row">
                        {/*Gender*/}
                        <div className="column">
                            <Dropdown 
                                label='Gender: '
                                options={genders}
                                selected={gender}
                                setSelected={setGender}
                                defaultSelected="Select Gender" // Default value
                            />
                        </div>

                        {/*Date Of Birth*/}
                        <Input 
                            label="Date of Birth:"
                            type="date"
                            value={dob}
                            setValue={setDob}
                        />

                        {/*Age*/}
                        <Input
                            label="Age:"
                            type="number"
                            value={age}
                            setValue={setAge}
                            min={18}
                            max={100}
                        />
                    </div>
                    <div className="row">
                        {/*State*/}
                        <div className="column">
                            <Dropdown 
                                label='State: '
                                options={states}
                                selected={state}
                                setSelected={setState}
                                defaultSelected="Select State" // Default value
                            />
                        </div>

                        {/*City*/}
                        <Input 
                            label="City:"
                            type="text"
                            value={city}
                            setValue={setCity}
                        />

                        {/*Pincode*/}
                        <Input 
                            label="Pincode:"
                            type="number"
                            value={pincode}
                            setValue={setPincode}
                        />
                    </div>
                    <div className="row">
                        {/*Email*/}
                        <Input
                            label="Email:"
                            type="email"
                            value={email}
                            setValue={setEmail}
                        />

                        {/*Contact Number*/}
                        <div className="column">
                            <label>Contact Number:</label>
                            <PhoneNumber
                                state={phone}
                                setState={setPhone}
                            />
                        </div>
                    </div>


                    <div className="row">
                            {/*Degree*/}
                            <div className="column">
                                <label>Degree:</label>
                                <Dropdown 
                                    options={degrees}
                                    selected={degree}
                                    setSelected={setDegree}
                                />
                            </div>

                            {/*Registration Number*/}
                            <Input 
                                label="Registration Number:"
                                type="text"
                                value={RegNo}
                                setValue={setRegNo}
                            />
                        
                    </div>

                    {/*PDF Upload*/}
                    <div className="row">
                        <div className="column">
                            <label>Upload Degree:</label>
                            <input type="file" onChange={handleFileChange} />
                        </div>
                    </div>
                    {/* <div className="terms">
                        <input type="checkbox" required />
                        <p>By clicking Signup, you agree to our Terms and Conditions</p>
                    </div> */}


                    {/*Terms and Condition*/}
                    <div>
                        <Checkbox
                            label="Accept Terms and Conditions"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            required={true}
                        />
                    </div>

                    {/*Submission*/}
                    <button type="submit">Signup</button>
                </form>
            </div>
            <p>{message}</p>
        </div>
    );
};

export default Signup;
