import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './AddHospital.css';
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from '../../Context/AppContext';
import Navbar from '../../Components/Navbar/Navbar';

const AddHospital = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useContext(AppContext);
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
            const submissionData = {
                HospitalName: hospital.HospitalName,
                email: hospital.email,
                contactNo: hospital.contactNo ? Number(hospital.contactNo) : undefined,
                Street: hospital.Street,
                Area: hospital.Area,
                Landmark: hospital.Landmark,
                pincode: hospital.pincode ? Number(hospital.pincode) : undefined,
                HospitalRegNo: hospital.HospitalRegNo ? Number(hospital.HospitalRegNo) : undefined,
                Speciality: hospital.Speciality,
                userId: user._id
            };

            console.log('Submitting data:', submissionData);

            let response;
            if (id) {
                response = await axios.put(`http://localhost:3000/dashboard/update-hospital/${id}`, submissionData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            } else {
                response = await axios.post('http://localhost:3000/dashboard/hospital', submissionData, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            }

            console.log('Server response:', response.data);

            navigate("/dashboard");
        } catch (error) {
            console.error('Error submitting hospital data:', error.response ? error.response.data : error.message);
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="addHospital">
            <Navbar showDropdown={true} />
            <div className="addHospitalForm">
                <div className="addHospitalHolder">
                    <div className="addFormLeft">
                        <div className="addFormHeading">{id ? 'Edit Hospital' : 'Add Hospital'}</div>
                        <form onSubmit={submit}>
                            <div className="rowForm">
                                <div className="columnForm">
                                    <div className="namesForm">Hospital Name</div>
                                    <input type="text" name="HospitalName" className="inputForm single" placeholder='Enter the Hospital Name' value={hospital.HospitalName} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="rowForm">
                                <div className="columnForm half">
                                    <div className="namesForm">Email Id</div>
                                    <input type="email" name="email" className="inputForm" placeholder='Enter the Email Id' value={hospital.email} onChange={handleChange} required/>
                                </div>
                                <div className="columnForm half">
                                    <div className="namesForm">Contact No</div>
                                    <input type="tel" name="contactNo" className="inputForm" placeholder='Enter the Contact Number' value={hospital.contactNo} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="rowForm">
                                <div className="columnForm">
                                    <div className="namesForm">Street</div>
                                    <input type="text" name="Street" className="inputForm single" placeholder='Enter the Street' value={hospital.Street} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="rowForm">
                                <div className="columnForm">
                                    <div className="namesForm">Area</div>
                                    <input type="text" name="Area" className="inputForm single" placeholder='Enter the Area' value={hospital.Area} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="rowForm">
                                <div className="columnForm">
                                    <div className="namesForm">Landmark</div>
                                    <input type="text" name="Landmark" className="inputForm single" placeholder='Enter the Landmark' value={hospital.Landmark} onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="rowForm">
                                <div className="columnForm half">
                                    <div className="namesForm">Pincode</div>
                                    <input type="text" name="pincode" className="inputForm" placeholder='Enter the Pincode' value={hospital.pincode} onChange={handleChange} required/>
                                </div>
                                <div className="columnForm half">
                                    <div className="namesForm">Hospital Reg. No</div>
                                    <input type="text" name="HospitalRegNo" className="inputForm" placeholder='Enter the Hospital Reg No' value={hospital.HospitalRegNo} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="rowForm">
                                <div className="columnForm">
                                    <div className="namesForm">Speciality</div>
                                    <input type="text" name="Speciality" className="inputForm single" placeholder='Enter your Speciality' value={hospital.Speciality} onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="checkbox">
                                <input type="checkbox" id="confirm" name="confirm" value="confirm" required/>
                                <label htmlFor="confirm" className='checkboxText'>I confirm that the above provided information is correct to my knowledge</label>
                            </div>
                            <div className="buttonHolder">
                                <button type="submit" className='addHospitalButton'>{id ? 'Update Hospital' : 'Add Hospital'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddHospital;