import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './HospitalInfo.css';
import Navbar from '../../Components/Navbar/Navbar';
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';
import { AppContext } from '../../Context/AppContext';

const HospitalInfo = () => {
    const { isLoading } = useContext(AppContext);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [todayAppointmentsCount, setTodayAppointmentsCount] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isLoading) {
            get_patients();
            get_today_appointments();

            const intervalId = setInterval(get_today_appointments, 60000);

            return () => clearInterval(intervalId);
        }
    }, [isLoading]);

    const get_patients = async () => {
        try {
            const response = await axios.get('https://healsync-nm7z.onrender.com/patientHistory', {
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

    const get_today_appointments = async () => {
        try {
            const response = await axios.get('https://healsync-nm7z.onrender.com/patientHistory/today-appointments', {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('currentHospitalId')}`
                }
            });
            setTodayAppointmentsCount(response.data.appointments);
        } catch (error) {
            console.error('Error fetching today\'s appointments:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up request:', error.message);
            }
            setError('Failed to fetch today\'s appointments');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return(
        <div className="hospitalInfo">
            <Navbar showDropdown={true} />
            <div className='hospitalInfoBlock'>
                <LeftSideBar />
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
                </div>
            </div>
        </div>
    );
}

export default HospitalInfo;