import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './SearchPatient.css';
import Navbar from "../../Components/Navbar/Navbar";
import axios from 'axios';
import { useState,useEffect } from 'react';
import LeftSideBar from "../../Components/LeftSideBar/LeftSideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import PatientDirectoryCard from "../../Components/PatientDirectoryCard/PatientDirectoryCard";

const SearchPatient = () => {
    const [user, setUser] = React.useState('');
    // const [hospitalName, setHospitalName] = React.useState('');
    const [HospitalName, setHospitalName] = React.useState('');

    const get_user = async () => {
        try {
            const response = await axios.get('http://localhost:3000/dashboard/get-current-user', {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUser(response.data.data.name);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const get_hospital_name = async () => {
        try {
            const response = await axios.get('http://localhost:3000/hospital/', {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('currentHospitalId')}`
                }
            });
            console.log("Hospital Details:", response.data);
            setHospitalName(response.data.HospitalName);
        } catch (error) {
            console.error('Error fetching hospital data:', error);
        }
    };

    useEffect(() => {
        get_user();
        get_hospital_name();
    }, []);

    return(
        <div className="search-patient">
            <Navbar name={user} showDropdown={true} />
            <div className="searchPatientBlock">
                <LeftSideBar hosName={HospitalName} />
                <div className="searchPatientCenter">
                    <div className="searchPatientCenterHead">
                        <div className="searchPatientBar">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon"/>
                            <input type="text" placeholder="Search Patient" className="searchBarPatient"/>
                        </div>
                        <div className="addPatientButton">
                            <span className="addPatientText">Add Patients</span>
                            <FontAwesomeIcon icon={faUserPlus} className="addPatientIcon"/>
                        </div>
                    </div>
                    <div className="patientDirectory">Patient's Directory</div>
                    <div className="patientDirectoryCardHolder">
                        <PatientDirectoryCard name="Patient 1" />
                        <PatientDirectoryCard name="Patient 1" />
                        <PatientDirectoryCard name="Patient 1" />
                        <PatientDirectoryCard name="Patient 1" />
                        <PatientDirectoryCard name="Patient 1" />
                        <PatientDirectoryCard name="Patient 1" />
                        <PatientDirectoryCard name="Patient 1" />
                        <PatientDirectoryCard name="Patient 1" />
                        <PatientDirectoryCard name="Patient 1" />
                        <PatientDirectoryCard name="Patient 1" />
                        <PatientDirectoryCard name="Patient 1" />
                        <PatientDirectoryCard name="Patient 1" />
                        <PatientDirectoryCard name="Patient 1" />
                        <PatientDirectoryCard name="Patient 1" />
                        <PatientDirectoryCard name="Patient 1" />
                        <PatientDirectoryCard name="Patient 1" />
                    </div>
                </div>
                <div className='rightBlocks'>
                    <div className='rightUpBlock'>
                    </div>
                    <div className='rightDownBlock'>
                        <div className='Notification'>Notification</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPatient;