import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import './Appointment.css';
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';
import { AppContext } from '../../Context/AppContext';

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
    const [error, setError] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState('');

    const isEditMode = !!appointmentId;

    const fetchPatientData = useCallback(async () => {
        try {
            const response = await axios.get(`https://healsync-nm7z.onrender.com/patientHistory/${patientId}`, {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `${localStorage.getItem('currentHospitalId')}`
                }
            });
            setAppointmentData(prevData => ({
                ...prevData,
                name: response.data.patient.name
            }));
            setError(null);
        } catch (error) {
            console.error('Error fetching patient data:', error);
            setError('Failed to fetch patient data. Please try again.');
        }
    }, [patientId]);

    const fetchServerDate = useCallback(async () => {
        try {
            const response = await axios.get('https://healsync-nm7z.onrender.com/patientHistory/server-date');
            const serverDate = response.data.date;
            
            setAppointmentData(prevData => ({
                ...prevData,
                date: serverDate
            }));
            setError(null);
        } catch (error) {
            console.error('Error fetching server date:', error);
            setError('Failed to fetch the current date. Please try again.');
        }
    }, []);

    const fetchAppointmentData = useCallback(async () => {
        try {
            const response = await axios.get(`https://healsync-nm7z.onrender.com/patientHistory/appointment/${appointmentId}`, {
                headers: {
                    ContentType: 'application/json',
                    Authorization: localStorage.getItem('currentHospitalId')
                }
            });
            setAppointmentData(prevData => ({
                ...prevData,
                ...response.data
            }));
            setError(null);
        } catch (error) {
            console.error('Error fetching appointment data:', error);
            setError('Failed to fetch appointment data. Please try again.');
        }
    }, [appointmentId]);

    useEffect(() => {
        fetchPatientData();
        if (isEditMode) {
            fetchAppointmentData();
        } else {
            fetchServerDate();
        }
    }, [isEditMode, fetchPatientData, fetchAppointmentData, fetchServerDate]);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setAppointmentData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }, []);

    const validateForm = () => {
        const errors = [];

        if (!appointmentData.date) errors.push("Date is required");
        if (!appointmentData.temperature) errors.push("Temperature is required");
        else {
            const temp = parseFloat(appointmentData.temperature);
            if (isNaN(temp) || temp < 90 || temp > 108) errors.push("Temperature must be between 90 and 108°F");
        }
        if (!appointmentData.bloodPressure) errors.push("Blood Pressure is required");
        else {
            const bpRegex = /^\d{2,3}\/\d{2,3}$/;
            if (!bpRegex.test(appointmentData.bloodPressure)) errors.push("Blood Pressure must be in the format of 120/80");
        }
        if (!appointmentData.pulseRate) errors.push("Pulse Rate is required");
        else if (isNaN(appointmentData.pulseRate)) errors.push("Pulse Rate must be a number");
        if (!appointmentData.respiratoryRate) errors.push("Respiratory Rate is required");
        else if (!Number.isInteger(Number(appointmentData.respiratoryRate))) errors.push("Respiratory Rate must be an integer");
        if (!appointmentData.weight) errors.push("Weight is required");
        else if (isNaN(appointmentData.weight)) errors.push("Weight must be a number");
        if (!appointmentData.height) errors.push("Height is required");
        else if (isNaN(appointmentData.height)) errors.push("Height must be a number");
        if (!appointmentData.chiefComplaint) errors.push("Chief Complaint is required");
        if (!appointmentData.diagnosis) errors.push("Diagnosis is required");
        if (!appointmentData.advice) errors.push("Advice is required");
        if (!appointmentData.followUp) errors.push("Follow Up is required");
        if (!appointmentData.doctorNotes) errors.push("Doctor Notes are required");

        if (errors.length > 0) {
            setPopUpMessage(errors.join('\n'));
            setShowPopUp(true);
            return false;
        }
        return true;
    };

    const submit = useCallback(async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const endpoint = isEditMode
                ? `https://healsync-nm7z.onrender.com/patientHistory/updateAppointment/${appointmentId}`
                : 'https://healsync-nm7z.onrender.com/patientHistory/addPatientHistory';

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
            navigate(`/patientPastHistory/${patientId}`);
        } catch (error) {
            console.error(isEditMode ? "Error updating appointment:" : "Error adding patient history:", error);
            setPopUpMessage(isEditMode ? "Failed to update appointment. Please try again." : "Failed to save patient history. Please try again.");
            setShowPopUp(true);
        }
    }, [isEditMode, appointmentId, appointmentData, patientId, navigate]);

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
                                    <input type='date' id='date' name='date' value={appointmentData.date} onChange={handleInputChange} required />
                                </div>
                            </div>
    
                            <div className='form-row'>
                                <div className='form-group'>
                                    <label htmlFor='temperature'>Temperature (°F)</label>
                                    <input 
                                        type='number' 
                                        id='temperature' 
                                        name='temperature' 
                                        value={appointmentData.temperature} 
                                        onChange={handleInputChange} 
                                        placeholder='Enter temperature' 
                                        required
                                        min="90"
                                        max="108"
                                        step="0.1"
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
                                        placeholder='Enter BP (e.g., 120/80)' 
                                        required
                                        pattern="\d{2,3}\/\d{2,3}"
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='pulseRate'>Pulse Rate (bpm)</label>
                                    <input 
                                        type='number' 
                                        id='pulseRate' 
                                        name='pulseRate' 
                                        value={appointmentData.pulseRate} 
                                        onChange={handleInputChange} 
                                        placeholder='Enter pulse rate' 
                                        required
                                    />
                                </div>
                            </div>
    
                            <div className='form-row'>
                                <div className='form-group'>
                                    <label htmlFor='respiratoryRate'>Respiratory Rate (breaths/min)</label>
                                    <input 
                                        type='number' 
                                        id='respiratoryRate' 
                                        name='respiratoryRate' 
                                        value={appointmentData.respiratoryRate} 
                                        onChange={handleInputChange} 
                                        placeholder='Enter RR' 
                                        required
                                        step="1"
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='weight'>Weight (kg)</label>
                                    <input 
                                        type='number' 
                                        id='weight' 
                                        name='weight' 
                                        value={appointmentData.weight} 
                                        onChange={handleInputChange} 
                                        placeholder='Enter weight' 
                                        required
                                        step="0.1"
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='height'>Height (cm)</label>
                                    <input 
                                        type='number' 
                                        id='height' 
                                        name='height' 
                                        value={appointmentData.height} 
                                        onChange={handleInputChange} 
                                        placeholder='Enter height' 
                                        required
                                        step="0.1"
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
                                    required
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
                                    required
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
                                    required
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
                                    required
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
                                    required
                                />
                            </div>
    
                            <button type='button' className='save-button' onClick={submit}>
                                {isEditMode ? 'Update' : 'Save'}
                            </button>
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

export default React.memo(Appointment);