import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBar from '../../Components/SearchBar/Searchbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Card from "../../Components/Card/Card";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const Navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [hospitals, setHospitals] = useState([]);
    const [filteredHospitals, setFilteredHospitals] = useState([]);

    const get_user = async () => {
        const response = await axios.get('http://localhost:3000/dashboard/get-current-user', {
            headers: {
                ContentType: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setUser(response.data.data.name);
    };

    const getHospitals = async () => {
        try {
            const response = await axios.get('http://localhost:3000/dashboard/', {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log("Received Hospitals : " , response.data[0].Hospitals);
            setHospitals(response.data[0].Hospitals); // Store fetched hospitals in state
            setFilteredHospitals(response.data[0].Hospitals);
        } catch (error) {
            console.error('Error fetching hospitals:', error);
        }
    };

    useEffect(() => {
        get_user();
        getHospitals();
    }, []);

    const handleSearch = (query) => {
        const filtered = hospitals.filter((hospital) => {
            return hospital.HospitalName.toLowerCase().includes(query.toLowerCase());
        });
        setFilteredHospitals(filtered);
    };

    const sortHospital = () => {
        const sorted = [...filteredHospitals].sort((a, b) => {
            return a.HospitalName.localeCompare(b.HospitalName);
        });
        setFilteredHospitals(sorted);
    };

    const removeHospitalFromState = (hospitalId) => {
        const updatedHospitals = hospitals.filter(hospital => hospital._id !== hospitalId);
        setHospitals(updatedHospitals);
        setFilteredHospitals(updatedHospitals);
    };
    const goToHospitalInfo = (hospitalId) => {
        localStorage.setItem('hospitalId', hospitalId);
        Navigate('/hospitalInfo');
    };

    return (
        <div className="dashboard">
            <Navbar name={user} showDropdown={true} />
            <div className="dashboardBlocks">
                <div className="leftBlock">
                    <div className="leftBlockTop">
                        <SearchBar onSearch={handleSearch} />
                        <div className="addHospital">
                            <Link to="/add-hospital" className="linkAdd">Add <FontAwesomeIcon icon={faPlusSquare} className="plusRectangle-icon" /></Link>
                        </div>
                        <div className="sortHospital" onClick={sortHospital}>
                            Sort <FontAwesomeIcon icon={faFilter} className="Sort-icon" />
                        </div>
                    </div>
                    <div className="Hospitals">
                        {filteredHospitals.map((hospital) => (
                            <Card
                                key={hospital._id}
                                title={hospital.HospitalName}
                                description={hospital.Speciality}
                                id={hospital._id}
                                onDelete={() => removeHospitalFromState(hospital._id)}
                                onClick={(id) => goToHospitalInfo(hospital._id)}
                            />
                        ))}
                    </div>
                </div>
                <div className="rightBlocks">
                    <div className="rightUpBlock">
                    </div>
                    <div className="rightDownBlock">
                        <div className="Notification">Notification</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
