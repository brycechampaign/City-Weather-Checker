import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt as faTrashReg } from '@fortawesome/free-regular-svg-icons';

const Note = ({ text, setNotes, deleteNote }) => {
  const [isHoveringDelete, setIsHoveringDelete] = useState(false);

  const deleteIcon = isHoveringDelete ? (
    <FontAwesomeIcon icon={faTrashAlt} className="fa-2x" />
  ) : (
    <FontAwesomeIcon icon={faTrashReg} className="fa-2x" />
  );

  return (
    <div className="note city-info-item card">
      <span
        onClick={() => deleteNote()}
        onMouseEnter={() => setIsHoveringDelete(true)}
        onMouseLeave={() => setIsHoveringDelete(false)}
      >
        {deleteIcon}
      </span>
      <span className="note-text">{text}</span>
    </div>
  );
};

export default Note;
