import React from 'react';
import './Card.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Card({ title, description, id, onDelete, onClick }) {
    const navigate = useNavigate();

    const deleteAHospital = async (e) => {
        e.stopPropagation();
        try {
            const confirmDelete = window.confirm(`Are you sure you want to delete ${title}?`);
            if (confirmDelete) {
                await axios.delete(`http://localhost:3000/dashboard/delete-hospital/${id}`, {
                    headers: {
                        ContentType: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                onDelete(id);
            }
        } catch (error) {
            console.error('Error deleting hospital:', error);
            alert('Failed to delete hospital. Please try again.');
        }
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        navigate(`/edit-hospital/${id}`);
    };

    return (
        <div className="card" onClick={() => onClick(id)}>
            <div className='cardHeading'>{title}</div>
            <div className='cardDescription'>{description}</div>
            <div className='cardButton'>
                <button className='changeData editCard' onClick={handleEditClick}>Edit</button>
                <button className='changeData deleteCard' onClick={deleteAHospital}>Delete</button>
            </div>
        </div>
    );
}

export default Card;