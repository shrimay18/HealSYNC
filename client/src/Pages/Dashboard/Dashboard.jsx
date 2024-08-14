import React, { useState, useEffect, useContext } from "react";
import "./Dashboard.css";
import Navbar from "../../Components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from '../../Components/SearchBar/Searchbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Card from "../../Components/Card/Card";
import { AppContext } from '../../Context/AppContext';

function Dashboard() {
    const { user } = useContext(AppContext);
    const [hospitals, setHospitals] = useState([]);
    const [filteredHospitals, setFilteredHospitals] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getHospitals();
    }, []);

    const getHospitals = async () => {
        try {
            const response = await axios.get('http://localhost:3000/dashboard/', {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setHospitals(response.data[0].Hospitals);
            setFilteredHospitals(response.data[0].Hospitals);
        } catch (error) {
            console.error('Error fetching hospitals:', error);
        }
    };

    const handleSearch = (query) => {
        const filtered = hospitals.filter((hospital) => 
            hospital.HospitalName.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredHospitals(filtered);
    };

    const sortHospital = () => {
        const sorted = [...filteredHospitals].sort((a, b) => 
            a.HospitalName.localeCompare(b.HospitalName)
        );
        setFilteredHospitals(sorted);
    };

    const removeHospitalFromState = (hospitalId) => {
        setHospitals(prevHospitals => prevHospitals.filter(hospital => hospital._id !== hospitalId));
        setFilteredHospitals(prevFiltered => prevFiltered.filter(hospital => hospital._id !== hospitalId));
    };

    const goToHospital = (hospitalId) => {
        localStorage.setItem('currentHospitalId', hospitalId);
        navigate('/hospitalInfo');
    }

    return (
        <div className="dashboard">
            <Navbar showDropdown={true} />
            <div className="dashboardBlocks">
                <div className="leftBlock">
                    <div className="leftBlockTop">
                        <SearchBar onSearch={handleSearch} />
                        <div className="addHospital">
                            <Link to="/add-hospital" className="linkAdd">
                                Add <FontAwesomeIcon icon={faPlusSquare} className="plusRectangle-icon" />
                            </Link>
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
                                onDelete={removeHospitalFromState}
                                onClick={goToHospital}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;