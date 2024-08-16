import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [hospitalName, setHospitalName] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserAndHospital = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const userResponse = await axios.get('https://healsync-nm7z.onrender.com/dashboard/get-current-user', {
                    headers: {
                        ContentType: 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(userResponse.data.data.name);
            }

            const storedHospitalName = localStorage.getItem('currentHospitalName');
            if (storedHospitalName) {
                setHospitalName(storedHospitalName);
            }
        } catch (error) {
            console.error('Error fetching user or hospital data:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUserAndHospital();
    }, [fetchUserAndHospital]);

    const login = async (token) => {
        localStorage.setItem('token', token);
        await fetchUserAndHospital();
    };

    const updateHospitalName = (name) => {
        setHospitalName(name);
        localStorage.setItem('currentHospitalName', name);
    };

    const logout = () => {
        setUser(null);
        setHospitalName(null);
        localStorage.removeItem('token');
        localStorage.removeItem('currentHospitalId');
        localStorage.removeItem('currentHospitalName');
        localStorage.removeItem('currentPatientId');
        localStorage.removeItem('currentPatientName');
    };

    return (
        <AppContext.Provider value={{ user, hospitalName, isLoading, fetchUserAndHospital, updateHospitalName, logout, login }}>
            {children}
        </AppContext.Provider>
    );
};