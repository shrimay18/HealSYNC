import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import './Appointment.css';
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';

const Appointment = () => {
    const { patientId, appointmentId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [HospitalName, setHospitalName] = useState(null);
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
        get_user();
        get_hospital_name();
        fetchPatientData();
        if (isEditMode) {
            fetchAppointmentData();
        } else {
            fetchServerDate();
        }
    }, []);

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
        }
    };

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
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            } else if (error.request) {
                console.error("Request:", error.request);
            } else {
                console.error("Error message:", error.message);
            }
            console.error("Error config:", error.config);
            alert(isEditMode ? "Failed to update appointment. Please try again." : "Failed to save patient history. Please try again.");
        }
    };

    return (
        <div className='appointment'>
            <Navbar name={user} showDropdown={true} />
            <div className='appointmentBlock'>
                <LeftSideBar hosName={HospitalName} />
                <div className='appointmentCenterBlock'>
                    <p className='AppointmentHeaderText'>{isEditMode ? 'Edit Appointment' : 'New Appointment'}</p>
                    <div className='rowAppointment'>
                        <div className='columnAppointment'>
                            <p className='AppointmentLabel'>Patient Name</p>
                            <input type='text' className='double AppointmentInput' value={appointmentData.name} readOnly />
                        </div>
                        <div className='columnAppointment'>
                            <p className='AppointmentLabel'>Date</p>
                            <input type='date' className='double AppointmentInput dateLabel' name="date" value={appointmentData.date} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className='rowAppointment'>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Temperature</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient temperature' name="temperature" value={appointmentData.temperature} onChange={handleInputChange} />
                                <input type='text' className='smaller AppointmentInput timeLabel' placeholder='K' />
                            </div>
                        </div>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Blood Pressure</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient BP' name="bloodPressure" value={appointmentData.bloodPressure} onChange={handleInputChange} />
                                <input type='text' className='smaller AppointmentInput timeLabel' />
                            </div>
                        </div>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Pulse Rate</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient Pulse rate' name="pulseRate" value={appointmentData.pulseRate} onChange={handleInputChange} />
                                <input type='text' className='smaller AppointmentInput timeLabel' />
                            </div>
                        </div>
                    </div>
                    <div className='rowAppointment'>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Respiratory rate</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient RR' name="respiratoryRate" value={appointmentData.respiratoryRate} onChange={handleInputChange} />
                                <input type='text' className='smaller AppointmentInput timeLabel' />
                            </div>
                        </div>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Weight</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient weight' name="weight" value={appointmentData.weight} onChange={handleInputChange} />
                                <input type='text' className='smaller AppointmentInput timeLabel' />
                            </div>
                        </div>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Height</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient height' name="height" value={appointmentData.height} onChange={handleInputChange} />
                                <input type='text' className='smaller AppointmentInput timeLabel' />
                            </div>
                        </div>
                    </div>
                    <div className='rowAppointment'>
                        <div className='columnAppointment'>
                            <p className='AppointmentLabel'>Chief Complaint</p>
                            <input type='text' className='single AppointmentInput' placeholder='Please give your advice' name="chiefComplaint" value={appointmentData.chiefComplaint} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className='rowAppointment'>
                        <div className='columnAppointment'>
                            <p className='AppointmentLabel'>Diagnosis</p>
                            <input type='text' className='single AppointmentInput' placeholder='Please give What You felt About The Patient' name="diagnosis" value={appointmentData.diagnosis} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className='rowAppointment'>
                        <div className='columnAppointment'>
                            <p className='AppointmentLabel'>Advice</p>
                            <input type='text' className='single AppointmentInput' placeholder='Please give any advice to the patient' name="advice" value={appointmentData.advice} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="rowAppointment">
                        <div className="columnAppointment">
                            <p className="AppointmentLabel">Follow Up</p>
                            <input type="text" className="single AppointmentInput" placeholder="Please give any follow up advice to the patient" name="followUp" value={appointmentData.followUp} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="rowAppointment">
                        <div className="columnAppointment">
                            <p className="AppointmentLabel">Doctor Notes</p>
                            <input type="text" className="single AppointmentInput" placeholder="Please give any notes to the patient" name="doctorNotes" value={appointmentData.doctorNotes} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className='rowAppointment'>
                        <div className='columnAppointment'>
                            <button className='saveButton' onClick={submit}>{isEditMode ? 'Update' : 'Save'}</button>
                        </div>
                    </div>
                </div>
                <div className='rightBlocks'>
                    <div className='rightUpBlock'>
                    </div>
                    <div className='rightDownBlock'>
                        <div className='Notification'>Notification</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointment;