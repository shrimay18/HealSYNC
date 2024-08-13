// HistoryCard.jsx
import React from 'react';
import './HistoryCard.css';

function HistoryCard({ history, name }) {
  return (
    <div className="historycard">
      <div className="card-body">
        <h5 className="card-date"><span className="title">Date: </span>{history.date}</h5>
        <h5 className="card-complaint"><span className="title">Chief Complaint: </span>{history.chiefComplaint}</h5>
        <h5 className="card-diagnosis"><span className="title">Diagnosis: </span>{history.diagnosis}</h5>
        <h5 className="card-doctor"><span className="title">Doctor: </span>{name}</h5>
      </div>  
      <div className="card-footer">
        <button className="card-button">Save</button>
      </div>
    </div>
  );
}

export default HistoryCard;