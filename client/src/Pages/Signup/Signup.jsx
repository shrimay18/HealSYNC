
import React, { useState } from 'react';
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form:", { username, password }); // Log form submission data
        //check if pasword and confirm of password are same
        if (password !== confirmPassword) {
            setMessage('Entered password do not match');
            return;
        }
        console.log(
            "Submitting form:", { gender }
        )
        try {
            const response = await axios.post('http://localhost:3000/signup', {
                name: name,
                username: username,
                password: password,
                confirmPassword: confirmPassword,
                gender: gender,
                dateOfBirth: dob,
                age: age,
                state: state,
                city: city,
                pincode: pincode,
                email: email,
                phone: phone,
                Degree: degree,
                RegistrationNumber: RegNo,
                Pdf: 'pdf'

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
                            <PDFUpload />
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
                        />
                    </div>

                    {/*Submission*/}
                    <button type="submit">Signup</button>
                </form>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Signup;
