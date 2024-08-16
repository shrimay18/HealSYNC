import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUser as faUserProfile } from '@fortawesome/free-regular-svg-icons';
import { AppContext } from '../../Context/AppContext';
import './navbar.css';

const Navbar = ({ showDropdown = false }) => {
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const { user, isLoading, logout: contextLogout } = useContext(AppContext);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    }

    const logout = () => {
        contextLogout();
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
            <div className="profile" onClick={toggleDropdown} ref={dropdownRef}>
                <FontAwesomeIcon icon={faUser} className="user-icon" />
                <p className="username">{isLoading ? "Loading..." : user || "Guest"}</p>
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
        </nav>
    );
}

export default Navbar;