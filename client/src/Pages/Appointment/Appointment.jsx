import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import './Appointment.css';
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';

const Appointment = () => {
    const [user, setUser] = useState(null);
    const [HospitalName, setHospitalName] = useState(null);
    const [name, setName] = useState(null);
    const [date, setDate] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [weight, setWeight] = useState(null);
    const [pulseRate, setPulseRate] = useState(null);
    const [respiratoryRate, setRespiratoryRate] = useState(null);
    const [height, setHeight] = useState(null);
    const [bloodPressure, setBloodPressure] = useState(null);
    const [chiefComplaint, setChiefComplaint] = useState(null);
    const [diagnosis, setDiagnosis] = useState(null);
    const [advice, setAdvice] = useState(null);
    const [followUp, setFollowUp] = useState(null);
    const [doctorNotes, setDoctorNotes] = useState(null);


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
            console.log("Hospital Details:", response.data);
            setHospitalName(response.data.HospitalName);
        } catch (error) {
            console.error('Error fetching hospital data:', error);
        }
    };

    useEffect(() => {
        get_user();
        get_hospital_name();
    }, []);

    const submit = async () => {
        console.log("Reached Submit");
        try {
            const patientId = localStorage.getItem('currentPatientId');
            if (!patientId) {
                throw new Error("Patient ID not found in local storage");
            }

            const response = await axios.post('http://localhost:3000/patientHistory/addPatientHistory', {
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
            }, {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log("Patient history added", response);
        } catch (error) {
            console.error("Error adding patient history:", error);
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
                            <input type='text' className='double AppointmentInput' placeholder='Enter Patient Name' onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className='columnAppointment'>
                            <p className='AppointmentLabel'>Select Date</p>
                            <input type='date' className='double AppointmentInput dateLabel' onChange={(e) => setDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className='rowAppointment'>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Temperature</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient temperature' onChange={(e) => setTemperature(e.target.value)}/>
                                <input type='text' className='smaller AppointmentInput timeLabel' placeholder='K' />
                            </div>
                        </div>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Blood Pressure</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient BP' onChange={(e) => setBloodPressure(e.target.value)}/>
                                <input type='text' className='smaller AppointmentInput timeLabel' />
                            </div>
                        </div>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Pulse Rate</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient Pulse rate' onChange={(e) => setPulseRate(e.target.value)}/>
                                <input type='text' className='smaller AppointmentInput timeLabel' />
                            </div>
                        </div>
                    </div>
                    <div className='rowAppointment'>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Respiratory rate</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient RR' onChange={(e) => setRespiratoryRate(e.target.value)}/>
                                <input type='text' className='smaller AppointmentInput timeLabel' />
                            </div>
                        </div>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Weight</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient weight' onChange={(e) => setWeight(e.target.value)}/>
                                <input type='text' className='smaller AppointmentInput timeLabel' />
                            </div>
                        </div>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Height</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient height' onChange={(e) => setHeight(e.target.value)}/>
                                <input type='text' className='smaller AppointmentInput timeLabel' />
                            </div>
                        </div>
                    </div>
                    <div className='rowAppointment'>
                        <div className='columnAppointment'>
                            <p className='AppointmentLabel'>Chief Complaint</p>
                            <input type='text' className='single AppointmentInput' placeholder='Please give your advice' onChange={(e) => setChiefComplaint(e.target.value)}/>
                        </div>
                    </div>
                    <div className='rowAppointment'>
                        <div className='columnAppointment'>
                            <p className='AppointmentLabel'>Diagnosis</p>
                            <input type='text' className='single AppointmentInput' placeholder='Please give What You felt About The Patient' onChange={(e) => setDiagnosis(e.target.value)}/>
                        </div>
                    </div>
                    <div className='rowAppointment'>
                        <div className='columnAppointment'>
                            <p className='AppointmentLabel'>Advice</p>
                            <input type='text' className='single AppointmentInput' placeholder='Please give any advice to the patient' onChange={(e) => setAdvice(e.target.value)}/>
                        </div>
                    </div>
                    <div className="rowAppointment">
                        <div className="columnAppointment">
                            <p className="AppointmentLabel">Follow Up</p>
                            <input type="text" className="single AppointmentInput" placeholder="Please give any follow up advice to the patient" onChange={(e) => setFollowUp(e.target.value)}/>
                        </div>
                        <div className="columnAppointment">
                            <p className="AppointmentLabel">Doctor Notes</p>
                            <input type="text" className="single AppointmentInput" placeholder="Please give any notes to the patient" onChange={(e) => setDoctorNotes(e.target.value)}/>
                        </div>
                    </div>
                    <div className='rowAppointment'>
                        <div className='columnAppointment'>
                            <button className='saveButton' onClick={submit}>Save</button> {/* Corrected this line */}
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
        </div>
    );
};

export default Appointment;
