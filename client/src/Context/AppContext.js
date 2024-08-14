import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [hospitalName, setHospitalName] = useState(null);

    const fetchUserAndHospital = async () => {
        try {
            const userResponse = await axios.get('http://localhost:3000/dashboard/get-current-user', {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUser(userResponse.data.data.name);

            const storedHospitalName = localStorage.getItem('currentHospitalName');
            if (storedHospitalName) {
                setHospitalName(storedHospitalName);
            } else {
                const hospitalId = localStorage.getItem('currentHospitalId');
                if (hospitalId) {
                    const hospitalResponse = await axios.get('http://localhost:3000/hospital/', {
                        headers: {
                            ContentType: 'application/json',
                            Authorization: `Bearer ${hospitalId}`
                        }
                    });
                    setHospitalName(hospitalResponse.data.HospitalName);
                    localStorage.setItem('currentHospitalName', hospitalResponse.data.HospitalName);
                }
            }
        } catch (error) {
            console.error('Error fetching user or hospital data:', error);
        }
    };

    useEffect(() => {
        fetchUserAndHospital();
    }, []);

    const updateHospitalName = (name) => {
        setHospitalName(name);
        localStorage.setItem('currentHospitalName', name);
    };

    return (
        <AppContext.Provider value={{ user, hospitalName, fetchUserAndHospital, updateHospitalName }}>
            {children}
        </AppContext.Provider>
    );
};