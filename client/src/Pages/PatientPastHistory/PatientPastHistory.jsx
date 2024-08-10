import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import './PatientPastHistory.css';
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const PatientPastHistory = () => {
    const [user, setUser] = useState(null);
    const [hospitalName, setHospitalName] = useState(null);
    const [patientName, setPatientName] = useState('Patient Name');
    const [error, setError] = useState(null);

    const get_user = async () => {
        try {
            const response = await axios.get('http://localhost:3000/dashboard/get-current-user', {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUser(response.data.data.name);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError('Failed to fetch user data');
        }
    };

    const get_hospital_name = async () => {
        try {
            const currentHospitalId = localStorage.getItem('currentHospitalId');
            const response = await axios.get(`http://localhost:3000/hospital/${currentHospitalId}`, {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setHospitalName(response.data.HospitalName);
        } catch (error) {
            console.error('Error fetching hospital data:', error);
            setError('Failed to fetch hospital data');
        }
    }

    useEffect(() => {
        get_user();
        get_hospital_name();
        const storedPatientName = localStorage.getItem('currentPatientName');
        if (storedPatientName) {
            setPatientName(storedPatientName);
        }
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="patientPastHistory">
            <Navbar name={user} showDropdown={true} />
            <div className='patientPastHistoryBlock'>
                <LeftSideBar hosName={hospitalName}/>
                <div className='patientPastHistoryCenterBlock'>
                    <div className='patientPastHistoryHeader'>
                        <p className='fpn'>{patientName}</p>
                        <div className='newAppointmentButton'>
                            <p>New Appointment</p>
                            <FontAwesomeIcon icon={faUserPlus} className='plusIcon' />
                        </div>
                    </div>
                </div>
                <div className="rightBlocks">
                    <div className="rightUpBlock">
                    </div>
                    <div className="rightDownBlock">
                        <div className='Notification'>Notification</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientPastHistory;