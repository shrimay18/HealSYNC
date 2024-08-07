import React from 'react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import './AddPatient.css';
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';
import Dropdown from '../../Components/Dropdown/Dropdown';
import PhoneNumber from '../../Components/PhoneNumberInput/PhoneNumber';


 const AddPatient = () => {
    const [user, setUser] = useState(null);
    const [gender, setGender] = useState('');
    const [state, setState] = useState('');
    const genders = ["Male", "Female", "Other"];
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
    const get_user = async () => {
        const response = await axios.get('http://localhost:3000/dashboard/get-current-user', {
            headers: {
                ContentType: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setUser(response.data.data.name);
    };
    useEffect(() => {
        get_user();
    }, []);
    return (
        <div className="addPatient">
            <Navbar name={user} showDropdown={true} />
            <div className='addPatientBlock'>
                <LeftSideBar />
                <div className='addPatientForm'>
                    <p className='addPatientHeaderForm'>Add Patient</p>
                    <p className='patientPersonalInfo'>Personal Information</p>
                    <div className='rowAdd'>
                        <div className='columnAdd patientName'>
                            <p className='patientNameLabel'>Name</p>
                            <input type='text' className='single patientNameInput' placeholder='Enter your name' />
                        </div>
                    </div>
                    <div className='rowAdd'>
                        <div className='columnAdd patientGender'>
                            <p className='component patientGenderLabel'>Gender</p>
                            <Dropdown options={genders}
                                    selected={gender}
                                    setSelected={setGender}
                                    defaultSelected="Select Gender" />
                        </div>
                        <div className='columnAdd patientDOB'>
                            <p className='patientDOBLabel'>Date of Birth</p>
                            <input type='date' className='triple patientDOBInput' />
                        </div>
                        <div className='columnAdd age'>
                            <p className='ageLabel'>Age</p>
                            <input type='number' className='triple ageInput' placeholder='Age'/>
                        </div>
                    </div>
                    <div className='rowAdd'>
                        <div className='columnAdd patientPhone'>
                            <p className='component patientPhoneLabel'>Phone Number</p>
                            <PhoneNumber className='double'/>
                        </div>
                        <div className='columnAdd EmergencyContact'>
                            <p className='component EmergencyContactLabel'>Emergency Contact</p>
                            <PhoneNumber />
                        </div>
                    </div>
                    <div className='rowAdd'>
                        <div className='columnAdd EmailIdPatient'>
                            <p className='EmailIdPatientLabel'>Email ID</p>
                            <input type='email' className='single EmailIdPatientInput' placeholder='Enter your email id' />
                        </div>
                    </div>
                    <div className='rowAdd'>
                        <div className='columnAdd patientAddress'>
                            <p className='patientAddressLabel'>Address</p>
                            <input type='text' className='single patientAddressInput' placeholder='Enter your address' />
                        </div>
                    </div>
                    <div className='rowAdd'>
                        <div className='columnAdd patientState'>
                            <p className='component 
                            patientStateLabel'>State</p>
                            <Dropdown options={states}
                                    selected={state}
                                    setSelected={setState}
                                    defaultSelected="Select State" />
                        </div>
                        <div className='columnAdd patientCity'>
                            <p className='patientCityLabel'>City</p>
                            <input type='text' className='triple patientCityInput' placeholder='Enter your city' />
                        </div>
                        <div className='columnAdd patientPincode'>
                            <p className='patientPincodeLabel'>Pincode</p>
                            <input type='number' className='triple patientPincodeInput' placeholder='Enter your pincode' />
                        </div>
                    </div>  
                    <p className='patientMedicalHistory'>Medical Information</p> 
                    <div className='rowAdd'>
                        <div className='columnAdd FamilyHistory'>
                            <p className='FamilyHistoryLabel'>Family History</p>
                            <input type='text' className='single FamilyHistoryInput' placeholder='Enter family history' />
                        </div>
                    </div>
                    <div className='rowAdd'>
                        <div className='columnAdd PastHistory'>
                            <p className='PastHistoryLabel'>Past History</p>
                            <input type='text' className='single PastHistoryInput' placeholder='Enter past history' />
                        </div>
                    </div>
                    <div className='rowAdd'>
                        <div className='columnAdd Allergies'>
                            <p className='AllergiesLabel'>Allergies(if any)</p>
                            <input type='text' className='single AllergiesInput' placeholder='Enter allergies' />
                        </div>
                    </div>
                    <div className='buttonHolderAddPatient'>
                        <button className='addPatientButton'>Add Patient</button>
                    </div>
                </div>
                <div className="rightBlocks">
                    <div className="rightUpBlock">
                    </div>
                    <div className="rightDownBlock">
                        <div className="Notification">Notification</div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default AddPatient;