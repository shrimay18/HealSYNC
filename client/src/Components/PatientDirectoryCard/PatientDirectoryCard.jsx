import React from "react";
import { useNavigate } from "react-router-dom";
import './PatientDirectoryCard.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

const PatientDirectoryCard = ({ name, patientId, patientContactNo, onDelete, onCardClick }) => {
    const navigate = useNavigate();

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm(`Are you sure you want to delete patient ${name}?`)) {
            onDelete(patientId);
        }
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`/editPatient/${patientId}`);
    };

    const formatContactNumber = (contactNo) => {
        console.log("Original contact number:", contactNo);
        if (typeof contactNo !== 'number') {
            console.log("Contact number is not a number");
            return "Invalid number";
        }

        const contactString = contactNo.toString();
        if (contactString.length <= 2) {
            console.log("Contact number is too short");
            return contactString;
        }

        const formattedNumber = contactString.slice(2);
        console.log("Formatted contact number:", formattedNumber);
        return formattedNumber;
    };

    const displayContactNo = formatContactNumber(patientContactNo);

    return (
        <div className="patient-directory-card" onClick={() => onCardClick(patientId, name)}>
            <div className="patient-details-card">
                <div className="patient-directory-card-img">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 10c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-5 1c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm4.83-1.68c.56.02 1.14.08 1.72.16 2.02.27 3.45 1.78 3.45 3.51v1c0 .55-.45 1-1 1h-10c-.55 0-1-.45-1-1v-1c0-1.73 1.43-3.24 3.45-3.51.58-.08 1.16-.14 1.72-.16.01 0 .01 0 .02 0 .45 0 .9.02 1.35.05h.01zM1 16v1h14v-1H1z"/>
                    </svg>
                </div>
                <div className="patient-directory-card-name">{name}</div>
                <div className="patient-directory-card-patientId">
                    <div className="title">Contact No: </div>
                    {displayContactNo}
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