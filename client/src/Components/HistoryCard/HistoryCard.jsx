import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HistoryCard.css';

function HistoryCard({ history, name }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/appointment/${history.patientId}/${history._id}`);
  };

  return (
    <div className="historycard">
      <div className="card-body">
        <h2 className="card-heading card-date"><span className="title">Date: </span>{history.date}</h2>
        <h2 className="card-heading card-complaint"><span className="title">Chief Complaint: </span>{history.chiefComplaint}</h2>
        <h2 className="card-heading card-diagnosis"><span className="title">Diagnosis: </span>{history.diagnosis}</h2>
        <h2 className="card-heading card-doctor"><span className="title">Doctor: </span>{name}</h2>
      </div>  
      <div className="card-footer">
        <button className="card-button" onClick={handleEdit}>Edit</button>
      </div>
    </div>
  );
}

export default HistoryCard;