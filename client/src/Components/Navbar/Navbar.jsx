import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';



const Navbar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/user', { withCredentials: true })
            .then(response => setUser(response.data))
            .catch(error => console.error('Error fetching user:', error));
    }, []);
    return (
        <div className="loginheader">
            <p>HealSYNC</p>
            <div className="profile">
                <div>
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div>
                    <p>{user ? user.username : 'Loading...'}</p>
                </div>
            </div>
        </div>
    );
}
export default Navbar;