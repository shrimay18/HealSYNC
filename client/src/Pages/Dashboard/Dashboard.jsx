import React from "react";
import { useState } from "react";
import "./Dashboard.css";
import Navbar from "../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBar from '../../Components/SearchBar/Searchbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
//i dont want it to be solid , i want the icon to be outlined
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faSort } from '@fortawesome/free-solid-svg-icons';
//import filter icon
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Card from "../../Components/Card/Card";

function Dashboard() {
    const handleSearch = (query) => {
        console.log('Search query:', query);
        // Implement your search logic here
    };

    // const [hospitals, setHospitals] = useState([]);

    // const addHospital = (hospital) => {
    //     setHospitals([...hospitals, hospital]);
    // };

    return (
        <div className="dashboard">
            <div className="loginheader">
                <p>HealSYNC</p>
            </div>
            <div className="dashboardBlocks">
                <div className="leftBlock">
                    <div className="leftBlockTop">
                        <SearchBar onSearch={handleSearch} />
                        <div className="addHospital">
                            <Link to="/add-hospital" className="linkAdd">Add <FontAwesomeIcon icon={faPlusSquare} className="plusRectangle-icon" /></Link>
                        </div>
                        <div className="sortHospital">
                            Sort <FontAwesomeIcon icon={faFilter} className="Sort-icon" />
                        </div>
                    </div>
                    <Card title="Hospital 1" description="Description 1" />
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