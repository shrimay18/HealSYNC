import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import './SearchPatient.css';
import Navbar from "../../Components/Navbar/Navbar";
import axios from 'axios';
import LeftSideBar from "../../Components/LeftSideBar/LeftSideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import PatientDirectoryCard from "../../Components/PatientDirectoryCard/PatientDirectoryCard";
import { AppContext } from '../../Context/AppContext';

const SearchPatient = () => {
    const { isLoading } = useContext(AppContext);
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const get_patients = async () => {
        try {
            const response = await axios.get('http://localhost:3000/patientHistory', {
                headers: {
                    ContentType: 'application/json',
                    Authorization: localStorage.getItem('currentHospitalId')
                }
            });
            console.log('Fetched patient data:', response.data);
            setPatients(response.data.patients);
            setFilteredPatients(response.data.patients);
        } catch (error) {
            console.error('Error fetching patients data:', error);
            setError('Failed to fetch patients data');
        }
    };

    useEffect(() => {
        if (!isLoading) {
            get_patients();
        }
    }, [isLoading]);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = patients.filter((patient) => 
            patient.name.toLowerCase().includes(query)
        );
        setFilteredPatients(filtered);
    };

    const handleAddPatient = () => {
        navigate('/addPatient');
    };

    const handleDeletePatient = async (patientId) => {
        try {
            await axios.delete(`http://localhost:3000/patientHistory/${patientId}`, {
                headers: {
                    ContentType: 'application/json',
                    Authorization: localStorage.getItem('currentHospitalId')
                }
            });

            const updatedPatients = patients.filter(patient => patient._id !== patientId);
            setPatients(updatedPatients);
            setFilteredPatients(updatedPatients);

            console.log(`Patient ${patientId} deleted successfully`);
        } catch (error) {
            console.error('Error deleting patient:', error);
            setError('Failed to delete patient');
        }
    };

    const handleEditPatient = (patientId) => {
        navigate(`/editPatient/${patientId}`);
    };

    const handlePatientClick = (patientId, patientName) => {
        localStorage.setItem('currentPatientName', patientName);
        localStorage.setItem('currentPatientId', patientId);
        navigate(`/patientPastHistory/${patientId}`);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="search-patient">
            <Navbar showDropdown={true} />
            <div className="searchPatientBlock">
                <LeftSideBar />
                <div className="searchPatientCenter">
                    <div className="searchPatientCenterHead">
                        <div className="searchPatientBar">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon"/>
                            <input 
                                type="text" 
                                placeholder="Search Patient" 
                                className="searchBarPatient" 
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                        <div className="addPatientButton" onClick={handleAddPatient}>
                            <span className="addPatientText">Add Patients</span>
                            <FontAwesomeIcon icon={faUserPlus} className="addPatientIcon"/>
                        </div>
                    </div>
                    <div className="patientDirectory">
                        Patient's Directory ({filteredPatients.length} patients)
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <div className="patientDirectoryCardHolder">
                        {filteredPatients.map((patient) => (
                            <PatientDirectoryCard 
                                key={patient._id} 
                                name={patient.name} 
                                patientId={patient._id}
                                patientContactNo={patient.contactNo}
                                onDelete={handleDeletePatient}
                                onEdit={handleEditPatient}
                                onCardClick={handlePatientClick}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPatient;