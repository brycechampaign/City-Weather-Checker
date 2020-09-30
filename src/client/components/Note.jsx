import React from 'react';

const Note = ({ text }) => {
  return (
    <div className="note">
      <span className="note-text city-info-item card">{text}</span>
    </div>
  );
};

export default Note;
