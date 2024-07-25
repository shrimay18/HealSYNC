import React from 'react';
import './Card.css';

function Card({ title, description }) {
  return (
    <div className="card">
      <div className='cardHeading'>{title}</div>
      <div className='cardButton'>
        <button className='changeData editCard'>Edit</button>
        <button className='changeData deleteCard'>Delete</button>
      </div> 
    </div>
  );
}

export default Card;