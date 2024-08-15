import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import './Appointment.css';
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';
import { AppContext } from '../../Context/AppContext';

const Appointment = () => {
    const { patientId, appointmentId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AppContext);
    const [appointmentData, setAppointmentData] = useState({
        name: '',
        date: '',
        temperature: '',
        weight: '',
        pulseRate: '',
        respiratoryRate: '',
        height: '',
        bloodPressure: '',
        chiefComplaint: '',
        diagnosis: '',
        advice: '',
        followUp: '',
        doctorNotes: ''
    });

    const isEditMode = !!appointmentId;

    useEffect(() => {
        fetchPatientData();
        if (isEditMode) {
            fetchAppointmentData();
        } else {
            fetchServerDate();
        }
    }, [isEditMode, appointmentId, patientId]);

    const fetchPatientData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/patientHistory/${patientId}`, {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `${localStorage.getItem('currentHospitalId')}`
                }
            });
            setAppointmentData(prevData => ({
                ...prevData,
                name: response.data.patient.name
            }));
        } catch (error) {
            console.error('Error fetching patient data:', error);
        }
    };

    const fetchServerDate = async () => {
        try {
            const response = await axios.get('http://localhost:3000/patientHistory/server-date');
            setAppointmentData(prevData => ({
                ...prevData,
                date: response.data.date
            }));
        } catch (error) {
            console.error('Error fetching server date:', error);
        }
    };

    const fetchAppointmentData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/patientHistory/appointment/${appointmentId}`, {
                headers: {
                    ContentType: 'application/json',
                    Authorization: localStorage.getItem('currentHospitalId')
                }
            });
            setAppointmentData(prevData => ({
                ...prevData,
                ...response.data
            }));
        } catch (error) {
            console.error('Error fetching appointment data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAppointmentData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const submit = async () => {
        try {
            const endpoint = isEditMode
                ? `http://localhost:3000/patientHistory/updateAppointment/${appointmentId}`
                : 'http://localhost:3000/patientHistory/addPatientHistory';

            const method = isEditMode ? 'put' : 'post';

            const response = await axios[method](
                endpoint,
                { ...appointmentData, patientId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('currentHospitalId')}`
                    }
                }
            );
            console.log(isEditMode ? "Appointment updated" : "Patient history added", response.data);
            navigate(`/patientPastHistory/${patientId}`);
        } catch (error) {
            console.error(isEditMode ? "Error updating appointment:" : "Error adding patient history:", error);
            alert(isEditMode ? "Failed to update appointment. Please try again." : "Failed to save patient history. Please try again.");
        }
    };

    return (
        <div className='appointment'>
            <Navbar showDropdown={true} />
            <div className='navbar-spacer'></div>
            <div className='appointment-wrapper'>
                <div className='appointment-content'>
                    <div className='sidebar-wrapper'>
                        <LeftSideBar />
                    </div>
                    <div className='appointment-form-container'>
                        <h2 className='appointment-header'>{isEditMode ? 'Edit Appointment' : 'New Appointment'}</h2>
                        <form className='appointment-form'>
                            <div className='form-row'>
                                <div className='form-group'>
                                    <label htmlFor='name'>Patient Name</label>
                                    <input type='text' id='name' value={appointmentData.name} readOnly />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='date'>Date</label>
                                    <input type='date' id='date' name='date' value={appointmentData.date} onChange={handleInputChange} />
                                </div>
                            </div>
    
                            <div className='form-row'>
                                <div className='form-group'>
                                    <label htmlFor='temperature'>Temperature (°F)</label>
                                    <input 
                                        type='text' 
                                        id='temperature' 
                                        name='temperature' 
                                        value={appointmentData.temperature} 
                                        onChange={handleInputChange} 
                                        placeholder='Enter temperature' 
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='bloodPressure'>Blood Pressure (mmHg)</label>
                                    <input 
                                        type='text' 
                                        id='bloodPressure' 
                                        name='bloodPressure' 
                                        value={appointmentData.bloodPressure} 
                                        onChange={handleInputChange} 
                                        placeholder='Enter BP' 
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='pulseRate'>Pulse Rate (bpm)</label>
                                    <input 
                                        type='text' 
                                        id='pulseRate' 
                                        name='pulseRate' 
                                        value={appointmentData.pulseRate} 
                                        onChange={handleInputChange} 
                                        placeholder='Enter pulse rate' 
                                    />
                                </div>
                            </div>
    
                            <div className='form-row'>
                                <div className='form-group'>
                                    <label htmlFor='respiratoryRate'>Respiratory Rate (breaths/min)</label>
                                    <input 
                                        type='text' 
                                        id='respiratoryRate' 
                                        name='respiratoryRate' 
                                        value={appointmentData.respiratoryRate} 
                                        onChange={handleInputChange} 
                                        placeholder='Enter RR' 
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='weight'>Weight (kg)</label>
                                    <input 
                                        type='text' 
                                        id='weight' 
                                        name='weight' 
                                        value={appointmentData.weight} 
                                        onChange={handleInputChange} 
                                        placeholder='Enter weight' 
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='height'>Height (cm)</label>
                                    <input 
                                        type='text' 
                                        id='height' 
                                        name='height' 
                                        value={appointmentData.height} 
                                        onChange={handleInputChange} 
                                        placeholder='Enter height' 
                                    />
                                </div>
                            </div>
    
                            <div className='form-group'>
                                <label htmlFor='chiefComplaint'>Chief Complaint</label>
                                <input 
                                    type='text' 
                                    id='chiefComplaint' 
                                    name='chiefComplaint' 
                                    value={appointmentData.chiefComplaint} 
                                    onChange={handleInputChange} 
                                    placeholder='Enter chief complaint' 
                                />
                            </div>
    
                            <div className='form-group'>
                                <label htmlFor='diagnosis'>Diagnosis</label>
                                <input 
                                    type='text' 
                                    id='diagnosis' 
                                    name='diagnosis' 
                                    value={appointmentData.diagnosis} 
                                    onChange={handleInputChange} 
                                    placeholder='Enter diagnosis' 
                                />
                            </div>
    
                            <div className='form-group'>
                                <label htmlFor='advice'>Advice</label>
                                <input 
                                    type='text' 
                                    id='advice' 
                                    name='advice' 
                                    value={appointmentData.advice} 
                                    onChange={handleInputChange} 
                                    placeholder='Enter advice' 
                                />
                            </div>
    
                            <div className='form-group'>
                                <label htmlFor='followUp'>Follow Up</label>
                                <input 
                                    type='text' 
                                    id='followUp' 
                                    name='followUp' 
                                    value={appointmentData.followUp} 
                                    onChange={handleInputChange} 
                                    placeholder='Enter follow up instructions' 
                                />
                            </div>
    
                            <div className='form-group'>
                                <label htmlFor='doctorNotes'>Doctor Notes</label>
                                <textarea 
                                    id='doctorNotes' 
                                    name='doctorNotes' 
                                    value={appointmentData.doctorNotes} 
                                    onChange={handleInputChange} 
                                    placeholder='Enter additional notes' 
                                />
                            </div>
    
                            <button type='button' className='save-button' onClick={submit}>
                                {isEditMode ? 'Update' : 'Save'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointment;