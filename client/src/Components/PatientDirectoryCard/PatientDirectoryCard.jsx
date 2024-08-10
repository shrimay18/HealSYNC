import React from "react";
import './PatientDirectoryCard.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

const PatientDirectoryCard = ({ name, patientId, onDelete, onEdit }) => {
    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete patient ${name}?`)) {
            onDelete(patientId);
        }
    };

    return (
        <div className="patient-directory-card">
            <div className="patient-details-card">
                <div className="patient-directory-card-img"></div>
                <div className="patient-directory-card-name">{name}</div>
                <div className="patient-directory-card-patientId">
                    <div className="title">Patient ID: </div>{patientId}
                </div>
            </div>
            <div className="patient-directory-card-buttons">
                <FontAwesomeIcon 
                    icon={faTrash} 
                    className="delete-icon"
                    onClick={handleDelete}
                />
                <FontAwesomeIcon 
                    icon={faPen} 
                    className="edit-icon"
                    onClick={() => onEdit(patientId)}
                />
            </div>
        </div>
    );
};

export default PatientDirectoryCard;