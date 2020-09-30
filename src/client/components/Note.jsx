import React, { useState, useEffect } from 'react';
import NoteEditInput from './NoteEditInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import {
  faTrashAlt as faTrashReg,
  faEdit as faEditReg,
} from '@fortawesome/free-regular-svg-icons';

const Note = ({ text, deleteNote, editNote }) => {
  const [isHoveringDelete, setIsHoveringDelete] = useState(false);
  const [isHoveringEdit, setIsHoveringEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const deleteIcon = isHoveringDelete ? (
    <FontAwesomeIcon icon={faTrashAlt} />
  ) : (
    <FontAwesomeIcon icon={faTrashReg} />
  );

  const editIcon = isHoveringEdit ? (
    <FontAwesomeIcon icon={faEdit} />
  ) : (
    <FontAwesomeIcon icon={faEditReg} />
  );

  const editCB = (text) => {
    editNote(text);
    setIsEditing(false);
  };

  return (
    <div className="note city-info-item card">
      {isEditing ? (
        <NoteEditInput currText={text} editCB={editCB} />
      ) : (
        <>
          <span
            onClick={() => deleteNote()}
            onMouseEnter={() => setIsHoveringDelete(true)}
            onMouseLeave={() => setIsHoveringDelete(false)}
            className="note-item"
          >
            {deleteIcon}
          </span>
          <span className="note-text note-item">{text}</span>
          <span
            onClick={() => setIsEditing(true)}
            onMouseEnter={() => setIsHoveringEdit(true)}
            onMouseLeave={() => setIsHoveringEdit(false)}
            className="note-item"
          >
            {editIcon}
          </span>
        </>
      )}
    </div>
  );
};

export default Note;
