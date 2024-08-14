import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import './PatientPastHistory.css';
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import HistoryCard from '../../Components/HistoryCard/HistoryCard';
import { AppContext } from '../../Context/AppContext';

const PatientPastHistory = () => {
    const { user } = useContext(AppContext);
    const [patientName, setPatientName] = useState('Patient Name');
    const [error, setError] = useState(null);
    const [patientHistory, setPatientHistory] = useState([]);
    const navigate = useNavigate();
    const { patientId } = useParams();

    useEffect(() => {
        const storedPatientName = localStorage.getItem('currentPatientName');
        if (storedPatientName) {
            setPatientName(storedPatientName);
        }
        get_patient_histories();
    }, [patientId]);

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

    const get_patient_histories = async () => {
        try {
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

    const handleNewAppointment = () => {
        navigate(`/appointment/${patientId}`);
    };

    const handleEditAppointment = (appointmentId) => {
        navigate(`/appointment/${patientId}/${appointmentId}`);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="patientPastHistory">
            <Navbar showDropdown={true} />
            <div className='patientPastHistoryBlock'>
                <LeftSideBar />
                <div className='patientPastHistoryCenterBlock'>
                    <div className='patientPastHistoryHeader'>
                        <p className='fpn'>{patientName}</p>
                        <div className='newAppointmentButton' onClick={handleNewAppointment}>
                            <p>New Appointment</p>
                            <FontAwesomeIcon icon={faUserPlus} className='plusIcon' />
                        </div>
                    </div>
                    <div className='historyCardsContainer'>
                        {patientHistory.map((history, index) => (
                            <HistoryCard 
                                key={history._id || index} 
                                history={history} 
                                name={user}
                                onEdit={() => handleEditAppointment(history._id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientPastHistory;