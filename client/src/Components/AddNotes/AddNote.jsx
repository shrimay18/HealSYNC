import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './AddNote.css'; 

const NotesComponent = (onClickAdd, note) => {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState('');

  

  const handleInputChange = (e) => {
    setNoteInput(e.target.value);
  };

  return (
    <div className="notesComponent">
      <div className="notesList">
        {notes.map((note, index) => (
          <div key={index} className="noteOnClick">
            {note}
          </div>
        ))}
      </div>
      <div className="addNote">
        <input
          type="text"
          value={noteInput}
          onChange={handleInputChange}
          placeholder="Type a note..."
          className='inputNotes'
        />
        <button onClick={() => onClickAdd} className='addNoteButton'>
          <FontAwesomeIcon icon={faPlus} /> Add note
        </button>
      </div>
    </div>
  );
};

export default NotesComponent;
