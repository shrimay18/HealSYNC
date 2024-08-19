import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './AddHospital.css';
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from '../../Context/AppContext';
import Navbar from '../../Components/Navbar/Navbar';

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

const AddHospital = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user, addHospital } = useContext(AppContext);
    const [hospital, setHospital] = useState({
        HospitalName: '',
        email: '',
        contactNo: '',
        Street: '',
        Area: '',
        Landmark: '',
        pincode: '',
        HospitalRegNo: '',
        Speciality: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [showPopUp, setShowPopUp] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState('');

    useEffect(() => {
        if (id) {
            fetchHospital();
        } else {
            setIsLoading(false);
        }
    }, [id]);

    const fetchHospital = async () => {
        try {
            const response = await axios.get(`https://healsync-nm7z.onrender.com/dashboard/hospital/${id}`, {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setHospital(prevState => ({
                ...prevState,
                ...response.data,
                contactNo: response.data.contactNo?.toString() || '',
                pincode: response.data.pincode?.toString() || '',
                HospitalRegNo: response.data.HospitalRegNo?.toString() || ''
            }));
        } catch (error) {
            console.error('Error fetching hospital:', error);
            setPopUpMessage('Error fetching hospital data. Please try again.');
            setShowPopUp(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'pincode' || name === 'contactNo' || name === 'HospitalRegNo') {
            const numericValue = value.replace(/\D/g, '');
            setHospital(prevState => ({
                ...prevState,
                [name]: name === 'pincode' ? numericValue.slice(0, 6) : numericValue
            }));
        } else {
            setHospital(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const validateForm = () => {
        const errors = [];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;

        if (!hospital.HospitalName) errors.push("Please enter Hospital Name");
        if (!hospital.email) errors.push("Please enter Email ID");
        else if (!emailRegex.test(hospital.email)) errors.push("Please enter a valid email address");
        if (!hospital.contactNo) errors.push("Please enter Contact Number");
        else if (!phoneRegex.test(hospital.contactNo)) errors.push("Contact Number must be 10 digits");
        if (!hospital.Street) errors.push("Please enter Street");
        if (!hospital.Area) errors.push("Please enter Area");
        if (!hospital.Landmark) errors.push("Please enter Landmark");
        if (!hospital.pincode) errors.push("Please enter Pincode");
        else if (hospital.pincode.length !== 6) errors.push("Pincode must be exactly 6 digits");
        if (!hospital.HospitalRegNo) errors.push("Please enter Hospital Registration Number");
        else if (!/^\d+$/.test(hospital.HospitalRegNo)) errors.push("Hospital Registration Number must contain only digits");
        if (!hospital.Speciality) errors.push("Please enter Speciality");

        if (errors.length > 0) {
            setPopUpMessage(errors.join('\n'));
            setShowPopUp(true);
            return false;
        }
        return true;
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const submissionData = {
                HospitalName: hospital.HospitalName,
                email: hospital.email,
                contactNo: hospital.contactNo ? Number(hospital.contactNo) : undefined,
                Street: hospital.Street,
                Area: hospital.Area,
                Landmark: hospital.Landmark,
                pincode: hospital.pincode ? Number(hospital.pincode) : undefined,
                HospitalRegNo: hospital.HospitalRegNo ? Number(hospital.HospitalRegNo) : undefined,
                Speciality: hospital.Speciality
            };


            let response;
            if (id) {
                response = await axios.put(`https://healsync-nm7z.onrender.com/dashboard/update-hospital/${id}`, submissionData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
            } else {
                response = await axios.post('https://healsync-nm7z.onrender.com/dashboard/hospital', submissionData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
            }

            if (response.data.hospital && typeof addHospital === 'function') {
                addHospital(response.data.hospital);
            }

            navigate("/dashboard");
        } catch (error) {
            console.error('Error submitting hospital data:', error.response ? error.response.data : error.message);
            if (error.response && error.response.data) {
                if (error.response.data.message === 'Email already registered') {
                    setPopUpMessage('This email is already registered. Please use a different email address.');
                } else if (error.response.data.message === 'Contact number already registered') {
                    setPopUpMessage('This contact number is already registered. Please use a different number.');
                } else {
                    setPopUpMessage('Error submitting hospital data. Please try again.');
                }
            } else {
                setPopUpMessage('Error submitting hospital data. Please try again.');
            }
            setShowPopUp(true);
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="add-hospital-container">
            <Navbar showDropdown={true} />
            <div className="add-hospital-content">
                <div className="add-hospital-form-wrapper">
                    <div className="add-hospital-form">
                        <div className="add-hospital-heading">{id ? 'Edit Hospital' : 'Add Hospital'}</div>
                        <form onSubmit={submit}>
                            <div className="form-row">
                                <div className="form-column">
                                    <div className="form-label">Hospital Name</div>
                                    <input type="text" name="HospitalName" className="form-input full-width" placeholder='Enter the Hospital Name' value={hospital.HospitalName} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-column half-width">
                                    <div className="form-label">Email Id</div>
                                    <input type="email" name="email" className="form-input" placeholder='Enter the Email Id' value={hospital.email} onChange={handleChange} required/>
                                </div>
                                <div className="form-column half-width">
                                    <div className="form-label">Contact No</div>
                                    <input type="tel" name="contactNo" className="form-input" placeholder='Enter the Contact Number' value={hospital.contactNo} onChange={handleChange} maxLength={10} required/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-column">
                                    <div className="form-label">Street</div>
                                    <input type="text" name="Street" className="form-input full-width" placeholder='Enter the Street' value={hospital.Street} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-column">
                                    <div className="form-label">Area</div>
                                    <input type="text" name="Area" className="form-input full-width" placeholder='Enter the Area' value={hospital.Area} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-column">
                                    <div className="form-label">Landmark</div>
                                    <input type="text" name="Landmark" className="form-input full-width" placeholder='Enter the Landmark' value={hospital.Landmark} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-column half-width">
                                    <div className="form-label">Pincode</div>
                                    <input type="text" name="pincode" className="form-input" placeholder='Enter the Pincode' value={hospital.pincode} onChange={handleChange} maxLength={6} required/>
                                </div>
                                <div className="form-column half-width">
                                    <div className="form-label">Hospital Reg. No</div>
                                    <input type="text" name="HospitalRegNo" className="form-input" placeholder='Enter the Hospital Reg No' value={hospital.HospitalRegNo} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-column">
                                    <div className="form-label">Speciality</div>
                                    <input type="text" name="Speciality" className="form-input full-width" placeholder='Enter your Speciality' value={hospital.Speciality} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="form-checkbox">
                                <input type="checkbox" id="confirm" name="confirm" value="confirm" required/>
                                <label htmlFor="confirm" className='checkbox-label'>I confirm that the above provided information is correct to my knowledge</label>
                            </div>
                            <div className="form-button-wrapper">
                                <button type="submit" className='add-hospital-button'>{id ? 'Update Hospital' : 'Add Hospital'}</button>
                            </div>
                        </form>
                    </div>
                </div>
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

export default AddHospital;