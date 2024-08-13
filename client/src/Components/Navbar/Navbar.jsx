import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser as faUserProfile } from '@fortawesome/free-regular-svg-icons';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './navbar.css';

const Navbar = ({ name = "Guest", showDropdown = false }) => {
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    }

    const toggleMobileMenu = () => {
        setMobileMenuVisible(!mobileMenuVisible);
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('currentHospitalId');
        localStorage.removeItem('currentPatientId');
        localStorage.removeItem('currentPatientName');
        navigate('/');
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <p>HealSync</p>
            </div>
            <div className="navbar-menu">
                <div className={`navbar-end ${mobileMenuVisible ? 'is-active' : ''}`}>
                    <div className="profile" onClick={toggleDropdown} ref={dropdownRef}>
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
            </div>
            <div className="navbar-burger" onClick={toggleMobileMenu}>
                <FontAwesomeIcon icon={faBars} />
            </div>
        </nav>
    );
}

export default Navbar;