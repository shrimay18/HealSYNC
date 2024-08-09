import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import './HospitalInfo.css';
import Navbar from '../../Components/Navbar/Navbar';
import AddNotes from '../../Components/AddNotes/AddNote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faHospital } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';

const HospitalInfo = () => {
    const [user, setUser] = useState(null);
    const [hospitalName, setHospitalName] = useState(null);

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
        get_hospital_name()
    }, []);


    return(
        <div className="hospitalInfo">
             <Navbar name={user} showDropdown={true} />
             <div className='hospitalInfoBlock'>
                <LeftSideBar hosName={hospitalName}/>
                {/* <div className='infoLeftBar'>
                    <div className="hospitalNameHeader">Hospital</div>
                    <div className='infoIcon homeComponent'>
                        <FontAwesomeIcon icon={faHome} className='iconSolid Home'/>
                        <p>Home</p>
                    </div>
                    <div className='infoIcon searchComponent'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='iconSolid Search'/>
                        <p>Search</p>
                    </div>
                    <div className='infoIcon hospitalComponent'>
                        <FontAwesomeIcon icon={faHospital} className='iconSolid Hospital'/>
                        <p>Hospital</p>
                    </div>
                    <div className='infoIcon userComponent'>
                        <FontAwesomeIcon icon={faUserPlus} className='iconSolid User'/>
                        <p>Add Patient</p>
                    </div>
                </div> */}
                <div className='overviewBlock'>
                    <div className='overviewHeader'>Total Overview</div>
                    <div className='cardsOverviewTop'>
                        <div className='cards totalPatients'>

                        </div>
                        <div className='cards gynacPatients'>

                        </div>
                        <div className='cards orthoPatients'>
                        </div>
                        <div className='cards neuroPatients'>

                        </div>
                    </div>
                    <div className='todayHistoryBlock'>
                        <div className='todayHistoryHeader'>Today's Overview</div>
                        <div className='todayHistoryCardsBlock'>
                            <div className='cards todayPatient'>
                                
                            </div>
                            <div className='cards todayGynacPatient'>
                                
                            </div>
                            <div className='cards todayDermatPatient'>
                            
                            </div>
                            <div className='cards todayHomeoPatient'>
                                
                            </div>
                        </div>
                    </div>
                    {/* <div className='doctorNote'>
                        <div className='doctorNoteHeader'>Doctor's Note</div>
                        //give three input fields for doctor's note

                    </div> */}
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