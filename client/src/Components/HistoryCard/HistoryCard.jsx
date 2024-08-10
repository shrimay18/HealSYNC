import React from 'react';
import './HistoryCard.css';
function HistoryCard({ history }) {
  return (
    <>
        <div className="historycard">
            <div className="card-body">
                <h5 className="card-date"><section className='title'>Date: </section> {history.date}</h5>
                <h5 className="card-complaint"><section className='title'>Chief Complaint: </section> {history.complaint}</h5>
                <h5 className="card-diagnosis"><section className='title'>Diagnosis: </section> {history.diagnosis}</h5>
                <h5 className="card-doctor"><section className='title'>Doctor: </section> {history.doctor}</h5>
            </div>  
            <div className="card-footer">
                <button className="card-button">Save</button>
            </div>
        </div>
    </>
  );
}

export default HistoryCard;