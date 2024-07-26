import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Navbar.css'; 

const Navbar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/user', { withCredentials: true })
            .then(response => setUser(response.data))
            .catch(error => console.error('Error fetching user:', error));
    }, []);

    return (
        <div className="loginheader">
            <p>HealSync</p>
            <div className="profile">
                <FontAwesomeIcon icon={faUser} />
                <p>{user ? user.username : 'Login/Sign Up'}</p>
            </div>
        </div>
    );
}

export default Navbar;
