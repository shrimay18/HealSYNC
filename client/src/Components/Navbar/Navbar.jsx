import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUser as faUserProfile } from '@fortawesome/free-regular-svg-icons';
import React, { useState } from 'react';
import './navbar.css';
import {useNavigate} from "react-router-dom";

const Navbar = ({ name = "Guest", showDropdown = false }) => {
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    }
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div className="loginheader">
            <p>HealSync</p>
            <div className="profile" onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faUser} />
                <p>{name}</p>
                {showDropdown && dropdownVisible && (
                    <div className="dropdown-menu">
                        <div className="dropdown-item">
                            <FontAwesomeIcon icon={faUserProfile} />
                            <span>My Profile</span>
                        </div>
                        <div className="dropdown-item" >
                            <FontAwesomeIcon icon={faCog} />
                            <span>Settings</span>
                        </div>
                        <div className="dropdown-item" onClick={logout}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            <span>Sign Out</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
