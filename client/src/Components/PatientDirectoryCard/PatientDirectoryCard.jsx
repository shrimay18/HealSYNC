import React from "react";
import { useNavigate } from "react-router-dom";
import './PatientDirectoryCard.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

const PatientDirectoryCard = ({ name, patientId, onDelete, onCardClick }) => {
    const navigate = useNavigate();

    const handleDelete = (e) => {
        e.stopPropagation();  // Prevent card click when delete is clicked
        if (window.confirm(`Are you sure you want to delete patient ${name}?`)) {
            onDelete(patientId);
        }
    };

    const handleEdit = (e) => {
        e.stopPropagation();  // Prevent card click when edit is clicked
        navigate(`/editPatient/${patientId}`);
    };

    return (
        <div className="patient-directory-card" onClick={() => onCardClick(patientId, name)}>
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
                    onClick={handleEdit}
                />
            </div>
        </div>
    );
};

export default PatientDirectoryCard;