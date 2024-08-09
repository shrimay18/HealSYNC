import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import './PatientPastHistory.css';
import {useState, useEffect} from 'react';
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const PatientPastHistory = () => {
    const [user, setUser] = useState(null);
    const [HospitalName, setHospitalName] = useState(null);
    const [patientName, setPatientName] = useState('Patient Name');
    const get_user = async () => {
        const response = await axios.get('http://localhost:3000/dashboard/get-current-user', {
            headers: {
                ContentType: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setUser(response.data.data.name);
    };

    const get_hospital_name = async () => {
        const response = await axios.get('http://localhost:3000/hospital/', {
            headers: {
                ContentType: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('currentHospitalId')}`
            }
        });
        console.log("Hospital Details:", response.data);
        setHospitalName(response.data.HospitalName);
    }
    useEffect(() => {
        get_user();
        get_hospital_name();
    }, []);
    return(
        <div className="patientPastHistory">
            <Navbar name={user} showDropdown={true} />
            <div className='patientPastHistoryBlock'>
                <LeftSideBar hosName={HospitalName}/>
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
                        <div className="Notification">Notification</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PatientPastHistory;