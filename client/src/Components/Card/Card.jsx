import React from 'react';
import './Card.css';
import axios from 'axios';

function Card({ title, description, id, onDelete, onClick }) {
    const deleteAHospital = async () => {
        try {
            await axios.delete(`http://localhost:3000/dashboard/delete-hospital/${id}`, {
                headers: {
                    ContentType: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            onDelete(); // Call the callback to update the state in Dashboard
        } catch (error) {
            console.error('Error deleting hospital:', error);
        }
    };

    return (
        <div className="card" onClick={() => onClick(id)}>
            <div className='cardHeading' >{title}</div>
            <div className='cardDescription'>{description}</div>
            <div className='cardButton'>
                <button className='changeData editCard'>Edit</button>
                <button className='changeData deleteCard' onClick={deleteAHospital}>Delete</button>
            </div>
        </div>
    );
}

export default Card;
