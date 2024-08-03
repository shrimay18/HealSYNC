import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMagnifyingGlass, faHospital, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import './LeftSideBar.css';

const LeftSideBar = () => {
    return (
        <div className='infoLeftBar'>
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
        </div>
    );
}
export default LeftSideBar;
