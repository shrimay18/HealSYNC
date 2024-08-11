import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMagnifyingGlass, faHospital, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import './LeftSideBar.css';
import { useNavigate } from 'react-router-dom';

const LeftSideBar = ({hosName}) => {
    const navigate = useNavigate();
    return (
        <div className='infoLeftBar'>
            <div className="hospitalNameHeader">{hosName}</div>
            <div className='infoIcon homeComponent' onClick={() => navigate("/hospitalInfo")}>
                <FontAwesomeIcon icon={faHome} className='iconSolid Home'/>
                <p>Home</p>
            </div>
            <div className='infoIcon searchComponent' onClick={() => navigate("/searchPatient")}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='iconSolid Search'/>
                <p>Search</p>
            </div>
            <div className='infoIcon hospitalComponent' onClick={() => navigate("/dashboard")}>
                <FontAwesomeIcon icon={faHospital} className='iconSolid Hospital'/>
                <p>Hospital</p>
            </div>
            <div className='infoIcon userComponent' onClick={() => navigate("/addPatient")}>
                <FontAwesomeIcon icon={faUserPlus} className='iconSolid User'/>
                <p>Add Patient</p>
            </div>
        </div>
    );
}
export default LeftSideBar;
