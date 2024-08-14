import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMagnifyingGlass, faHospital, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../Context/AppContext';
import './LeftSideBar.css';

const LeftSideBar = () => {
    const navigate = useNavigate();
    const { hospitalName } = useContext(AppContext);

    return (
        <div className='infoLeftBar'>
            <div className="hospitalNameHeader">{hospitalName || "Loading..."}</div>
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