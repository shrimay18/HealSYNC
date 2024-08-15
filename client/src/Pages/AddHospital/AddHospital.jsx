import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './AddHospital.css';
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from '../../Context/AppContext';
import Navbar from '../../Components/Navbar/Navbar';

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

    useEffect(() => {
        if (id) {
            fetchHospital();
        } else {
            setIsLoading(false);
        }
    }, [id]);

    const fetchHospital = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/dashboard/hospital/${id}`, {
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
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHospital(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const submit = async (e) => {
        e.preventDefault();
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

            console.log('Submitting data:', submissionData);

            let response;
            if (id) {
                response = await axios.put(`http://localhost:3000/dashboard/update-hospital/${id}`, submissionData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
            } else {
                response = await axios.post('http://localhost:3000/dashboard/hospital', submissionData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
            }

            console.log('Server response:', response.data);

            if (response.data.hospital && typeof addHospital === 'function') {
                addHospital(response.data.hospital);
            }

            navigate("/dashboard");
        } catch (error) {
            console.error('Error submitting hospital data:', error.response ? error.response.data : error.message);
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
                                    <input type="tel" name="contactNo" className="form-input" placeholder='Enter the Contact Number' value={hospital.contactNo} onChange={handleChange} required/>
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
                                    <input type="text" name="Landmark" className="form-input full-width" placeholder='Enter the Landmark' value={hospital.Landmark} onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-column half-width">
                                    <div className="form-label">Pincode</div>
                                    <input type="text" name="pincode" className="form-input" placeholder='Enter the Pincode' value={hospital.pincode} onChange={handleChange} required/>
                                </div>
                                <div className="form-column half-width">
                                    <div className="form-label">Hospital Reg. No</div>
                                    <input type="text" name="HospitalRegNo" className="form-input" placeholder='Enter the Hospital Reg No' value={hospital.HospitalRegNo} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-column">
                                    <div className="form-label">Speciality</div>
                                    <input type="text" name="Speciality" className="form-input full-width" placeholder='Enter your Speciality' value={hospital.Speciality} onChange={handleChange}/>
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
        </div>
    );
};

export default AddHospital;