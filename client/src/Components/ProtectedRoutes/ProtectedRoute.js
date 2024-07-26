import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ProtectedRoute ({children}){
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const getValidUser = async () => {
        try {
            const response = await axios.get("https://localhost3000/login/get-current-user", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUser(response.data);
        }
        catch(err){
            setUser(null);
            console.error("Error getting user:", err);
        }
    };

    useEffect(() => {
        if(localStorage.getItem('token')){
            getValidUser();
        }
        else{
            navigate("/");
        }
    }, [navigate]);
}