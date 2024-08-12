import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import './PatientPastHistory.css';
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import HistoryCard from '../../Components/HistoryCard/HistoryCard';

const PatientPastHistory = () => {
    const [user, setUser] = useState(null);
    const [hospitalName, setHospitalName] = useState(null);
    const [patientName, setPatientName] = useState('Patient Name');
    const [error, setError] = useState(null);
    const [patientHistory, setPatientHistory] = useState([]);
    const navigate = useNavigate();
    const { patientId } = useParams();

    const parseDate = (dateString) => {
        if (!dateString) return new Date(); 

        let date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            return date;
        }
        
        const [day, month, year] = dateString.split('-');
        const monthIndex = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
            .indexOf(month.toLowerCase());
        
        if (monthIndex !== -1) {
            return new Date(year, monthIndex, day);
        }
        
        console.error(`Unable to parse date: ${dateString}`);
        return new Date();
    };

    const formatDate = (date) => {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            console.error(`Invalid date object: ${date}`);
            return 'Invalid Date';
        }
        const day = date.getDate().toString().padStart(2, '0');
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

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

    const get_patient_histories = async () => {
        try {
            const patientId = localStorage.getItem('currentPatientId');
            const response = await axios.get(`http://localhost:3000/patientHistory/${patientId}`, {
                headers: {
                    ContentType: 'application/json',
                    Authorization: localStorage.getItem('currentHospitalId')
                }
            });
            console.log('Fetched patient history:', response.data);
            
            // Sort the history array by date in descending order
            const sortedHistory = response.data.history.sort((a, b) => {
                const dateA = parseDate(a.date);
                const dateB = parseDate(b.date);
                return dateB - dateA;
            });
            
            // Format the dates
            const formattedHistory = sortedHistory.map(history => ({
                ...history,
                date: formatDate(parseDate(history.date))
            }));
            
            setPatientHistory(formattedHistory);
        } catch (error) {
            console.error('Error fetching patient history:', error);
            setError('Failed to fetch patient history');
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
    };

    useEffect(() => {
        get_user();
        get_hospital_name();
        get_patient_histories();
        const storedPatientName = localStorage.getItem('currentPatientName');
        if (storedPatientName) {
            setPatientName(storedPatientName);
        }
    }, []);

    const handleNewAppointment = () => {
        navigate(`/appointment/${patientId}`);
    };

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
                        <div className='newAppointmentButton' onClick={handleNewAppointment}>
                            <p>New Appointment</p>
                            <FontAwesomeIcon icon={faUserPlus} className='plusIcon' />
                        </div>
                        <div>
                            {patientHistory.map((history, index) => (
                                <HistoryCard key={history._id || index} history={history} name={user} />
                            ))}
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