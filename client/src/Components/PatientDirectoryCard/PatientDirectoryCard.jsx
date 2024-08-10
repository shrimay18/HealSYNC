import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './PatientDirectoryCard.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {faPen} from "@fortawesome/free-solid-svg-icons";

const PatientDirectoryCard = ({name}) => {
    return(

        <div className="patient-directory-card">
            <div className="patient-details-card">
                <div className="patient-directory-card-img"></div>
                <div className="patient-directory-card-name">{name}</div>
                <div className="patient-directory-card-patientId">Patient ID: 123456</div>
            </div>
            <div className="patient-directory-card-buttons">
                <FontAwesomeIcon icon={faTrash} className="delete-icon"/>
                <FontAwesomeIcon icon={faPen} className="edit-icon"/>
            </div>
        </div>
    );
};

export default PatientDirectoryCard;