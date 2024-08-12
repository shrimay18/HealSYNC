import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './HospitalInfo.css';
import Navbar from '../../Components/Navbar/Navbar';
import AddNotes from '../../Components/AddNotes/AddNote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMagnifyingGlass, faHospital, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';

const HospitalInfo = () => {
    const [user, setUser] = useState(null);
    const [hospitalName, setHospitalName] = useState(null);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [todayAppointmentsCount, setTodayAppointmentsCount] = useState(0);
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
            const response = await axios.get('http://localhost:3000/hospital/', {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('currentHospitalId')}`
                }
            });
            setHospitalName(response.data.HospitalName);
        } catch (error) {
            console.error('Error fetching hospital data:', error);
            setError('Failed to fetch hospital data');
        }
    }

    const get_patients = async () => {
        try {
            const response = await axios.get('http://localhost:3000/patientHistory', {
                headers: {
                    ContentType: 'application/json',
                    Authorization: localStorage.getItem('currentHospitalId')
                }
            });
            setFilteredPatients(response.data.patients);
        } catch (error) {
            console.error('Error fetching patients data:', error);
            setError('Failed to fetch patients data');
        }
    };


    useEffect(() => {
        get_user();
        get_hospital_name();
        get_patients();
    }, []);

    return(
        <div className="hospitalInfo">
            <Navbar name={user} showDropdown={true} />
            <div className='hospitalInfoBlock'>
                <LeftSideBar hosName={hospitalName}/>
                <div className='overviewBlock'>
                    <div className='overviewHeader'>Total Overview</div>
                    <div className='cardsOverviewTop'>
                        <div className='cards totalPatients'>
                            <div className='totalPatientsHeader'>Total Patients: </div>
                            <div className='totalPatientsCount'>{filteredPatients.length}</div>
                        </div>
                    </div>
                    <div className='todayHistoryBlock'>
                        <div className='todayHistoryHeader'>Today's Overview</div>
                        <div className='todayHistoryCardsBlock'>
                            <div className='cards todayPatient'>
                                <div className='todayPatientsHeader'>Today's Appointments: </div>
                                <div className='todayPatientsCount'>{todayAppointmentsCount}</div>
                            </div>
                        </div>
                    </div>
                    <div className='addNotes'>
                        <div className='addNotesHeader'>Doctor's Note</div>
                        <AddNotes />
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

export default HospitalInfo;