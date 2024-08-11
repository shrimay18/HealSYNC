import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import './Appointment.css';
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';

const Appointment = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [HospitalName, setHospitalName] = useState(null);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [temperature, setTemperature] = useState('');
    const [weight, setWeight] = useState('');
    const [pulseRate, setPulseRate] = useState('');
    const [respiratoryRate, setRespiratoryRate] = useState('');
    const [height, setHeight] = useState('');
    const [bloodPressure, setBloodPressure] = useState('');
    const [chiefComplaint, setChiefComplaint] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [advice, setAdvice] = useState('');
    const [followUp, setFollowUp] = useState('');
    const [doctorNotes, setDoctorNotes] = useState('');

    useEffect(() => {
        get_user();
        get_hospital_name();
        fetchPatientData();
        fetchServerDate();
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
            setName(response.data.patient.name);
        } catch (error) {
            console.error('Error fetching patient data:', error);
        }
    };

    const fetchServerDate = async () => {
        try {
            const response = await axios.get('http://localhost:3000/patientHistory/server-date');
            setDate(response.data.date);
        } catch (error) {
            console.error('Error fetching server date:', error);
        }
    };

    const submit = async () => {
        try {
            const patientHistoryData = {
                patientId: patientId,
                date: date,
                temperature: temperature,
                weight: weight,
                pulseRate: pulseRate,
                respiratoryRate: respiratoryRate,
                height: height,
                bloodPressure: bloodPressure,
                chiefComplaint: chiefComplaint,
                diagnosis: diagnosis,
                advice: advice,
                followUp: followUp,
                doctorNotes: doctorNotes
            };

            console.log('Sending patient history data:', patientHistoryData);

            const response = await axios.post('http://localhost:3000/patientHistory/addPatientHistory', 
                patientHistoryData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('currentHospitalId')}`
                    }
                }
            );
            console.log("Patient history added", response.data);
            navigate(`/patientPastHistory/${patientId}`);
        } catch (error) {
            console.error("Error adding patient history:");
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
            alert("Failed to save patient history. Please try again.");
        }
    };

    return (
        <div className='appointment'>
            <Navbar name={user} showDropdown={true} />
            <div className='appointmentBlock'>
                <LeftSideBar hosName={HospitalName} />
                <div className='appointmentCenterBlock'>
                    <p className='AppointmentHeaderText'>Appointment</p>
                    <div className='rowAppointment'>
                        <div className='columnAppointment'>
                            <p className='AppointmentLabel'>Patient Name</p>
                            <input type='text' className='double AppointmentInput' value={name} readOnly />
                        </div>
                        <div className='columnAppointment'>
                            <p className='AppointmentLabel'>Date</p>
                            <input type='date' className='double AppointmentInput dateLabel' value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>
                    </div>
                    <div className='rowAppointment'>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Temperature</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient temperature' value={temperature} onChange={(e) => setTemperature(e.target.value)} />
                                <input type='text' className='smaller AppointmentInput timeLabel' placeholder='K' />
                            </div>
                        </div>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Blood Pressure</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient BP' value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} />
                                <input type='text' className='smaller AppointmentInput timeLabel' />
                            </div>
                        </div>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Pulse Rate</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient Pulse rate' value={pulseRate} onChange={(e) => setPulseRate(e.target.value)} />
                                <input type='text' className='smaller AppointmentInput timeLabel' />
                            </div>
                        </div>
                    </div>
                    <div className='rowAppointment'>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Respiratory rate</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient RR' value={respiratoryRate} onChange={(e) => setRespiratoryRate(e.target.value)} />
                                <input type='text' className='smaller AppointmentInput timeLabel' />
                            </div>
                        </div>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Weight</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient weight' value={weight} onChange={(e) => setWeight(e.target.value)} />
                                <input type='text' className='smaller AppointmentInput timeLabel' />
                            </div>
                        </div>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Height</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient height' value={height} onChange={(e) => setHeight(e.target.value)} />
                                <input type='text' className='smaller AppointmentInput timeLabel' />
                            </div>
                        </div>
                    </div>
                    <div className='rowAppointment'>
                        <div className='columnAppointment'>
                            <p className='AppointmentLabel'>Chief Complaint</p>
                            <input type='text' className='single AppointmentInput' placeholder='Please give your advice' value={chiefComplaint} onChange={(e) => setChiefComplaint(e.target.value)} />
                        </div>
                    </div>
                    <div className='rowAppointment'>
                        <div className='columnAppointment'>
                            <p className='AppointmentLabel'>Diagnosis</p>
                            <input type='text' className='single AppointmentInput' placeholder='Please give What You felt About The Patient' value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
                        </div>
                    </div>
                    <div className='rowAppointment'>
                        <div className='columnAppointment'>
                            <p className='AppointmentLabel'>Advice</p>
                            <input type='text' className='single AppointmentInput' placeholder='Please give any advice to the patient' value={advice} onChange={(e) => setAdvice(e.target.value)} />
                        </div>
                    </div>
                    <div className="rowAppointment">
                        <div className="columnAppointment">
                            <p className="AppointmentLabel">Follow Up</p>
                            <input type="text" className="single AppointmentInput" placeholder="Please give any follow up advice to the patient" value={followUp} onChange={(e) => setFollowUp(e.target.value)} />
                        </div>
                    </div>
                    <div className="rowAppointment">
                        <div className="columnAppointment">
                            <p className="AppointmentLabel">Doctor Notes</p>
                            <input type="text" className="single AppointmentInput" placeholder="Please give any notes to the patient" value={doctorNotes} onChange={(e) => setDoctorNotes(e.target.value)} />
                        </div>
                    </div>
                    <div className='rowAppointment'>
                        <div className='columnAppointment'>
                            <button className='saveButton' onClick={submit}>Save</button>
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