import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import './Appointment.css';
import {useState, useEffect} from 'react';
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Appointment = () => {
    const [user, setUser] = useState(null);
    const get_user = async () => {
        const response = await axios.get('http://localhost:3000/dashboard/get-current-user', {
            headers: {
                ContentType: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setUser(response.data.data.name);
    };
    useEffect(() => {
        get_user();
    }, []);

    return(
        <div className='appointment'>
            <Navbar name={user} showDropdown={true} />
            <div className='appointmentBlock'>
                <LeftSideBar />
                <div className='appointmentCenterBlock'>
                    <p className='AppointmentHeaderText'>Appointment</p>
                    <div className='rowAppointment'>
                        <div className='columnAppointment'>
                            <p className='AppointmentLabel'>Patient Name</p>
                            <input type='text' className='double AppointmentInput' placeholder='Enter Patient Name' />
                        </div>
                        <div className='columnAppointment'>
                            <p className='AppointmentLabel'>Select Date</p>
                            <input type='date' className='double AppointmentInput dateLabel' />
                        </div>
                    </div>
                    <div className='rowAppointment'>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Temperature</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient temperature'/>
                                <input type='text' className='smaller AppointmentInput timeLabel' placeholder='K'/>
                            </div>  
                        </div>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Blood Pressure</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient BP'/>
                                <input type='text' className='smaller AppointmentInput timeLabel' />
                            </div>  
                        </div>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Pulse Rate</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient Pulse rate'/>
                                <input type='text' className='smaller AppointmentInput timeLabel' />
                            </div>  
                        </div>
                    </div>
                    <div className='rowAppointment'>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Respiratory rate</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient RR'/>
                                <input type='text' className='smaller AppointmentInput timeLabel' />
                            </div>  
                        </div>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Weight</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient weight'/>
                                <input type='text' className='smaller AppointmentInput timeLabel' />
                            </div>  
                        </div>
                        <div className='threeColumnAppointment'>
                            <p className='AppointmentLabel'>Height</p>
                            <div className='inputHolder'>
                                <input type='text' className='a AppointmentInput timeLabel' placeholder='Enter patient height'/>
                                <input type='text' className='smaller AppointmentInput timeLabel' />
                            </div>  
                        </div>
                    </div>
                    <div className='rowAppointment'>
                        <div className='columnAppointment'>
                            <p className='AppointmentLabel'>Chief Complain</p>
                            <input type='text' className='single AppointmentInput' placeholder='Please give your advice' />
                        </div>
                    </div>
                    <div className='rowAppointment'>
                        <div className='columnAppointment'>
                            <p className='AppointmentLabel'>Chief Complain</p>
                            <input type='text' className='single AppointmentInput' placeholder='Please give your advice' />
                        </div>
                    </div>
                    <div className='rowAppointment'>
                        <div className='columnAppointment'>
                            <p className='AppointmentLabel'>Chief Complain</p>
                            <input type='text' className='single AppointmentInput' placeholder='Please give your advice' />
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
}
export default Appointment;