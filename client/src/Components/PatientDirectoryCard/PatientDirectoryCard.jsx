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
        console.log("Original contact number:", contactNo); // Log original number
        if (typeof contactNo !== 'number') {
            console.log("Contact number is not a number");
            return "Invalid number";
        }
        
        // Convert number to string, then remove first two digits
        const contactString = contactNo.toString();
        if (contactString.length <= 2) {
            console.log("Contact number is too short");
            return contactString;
        }
        
        const formattedNumber = contactString.slice(2);
        console.log("Formatted contact number:", formattedNumber); // Log formatted number
        return formattedNumber;
    };

    const displayContactNo = formatContactNumber(patientContactNo);

    return (
        <div className="patient-directory-card" onClick={() => onCardClick(patientId, name)}>
            <div className="patient-details-card">
                <div className="patient-directory-card-img"></div>
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
                <FontAwesomeIcon a
                    icon={faPen}
                    className="edit-icon"
                    onClick={handleEdit}
                />
            </div>
        </div>
    );
};

export default PatientDirectoryCard;