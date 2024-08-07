// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from 'react';

// function ProtectedRoute ({children}){
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();

    // const getValidUser = async () => {
    //     try {
    //         const response = await axios.get("https://localhost3000/login/get-current-user", {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('token')}`
    //             }
    //         });
    //         setUser(response.data);
    //         navigate("/dashboard"); // Redirect to login page upon successful login
    //     }
    //     catch(err){
    //         setUser(null);
    //         console.error("Error getting user:", err);
    //     }
    // };

//     useEffect(() => {
//         if(localStorage.getItem('token')){
//             getValidUser();
//         }
//         else{
//             navigate("/");
//         }
//     }, [navigate]);

//     return children;
// }

// export default ProtectedRoute;


// Client/src/Components/ProtectedRoutes/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
