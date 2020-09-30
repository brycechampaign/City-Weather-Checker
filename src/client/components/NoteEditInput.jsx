import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const NoteEditInput = ({ currText, editCB }) => {
  const [text, setText] = useState(currText);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log('submitted');
    e.preventDefault();
    editCB(text);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="search">
        <textarea type="text" value={text} onChange={(e) => handleChange(e)} />
        <button type="submit" className="search-button">
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </div>
    </form>
  );
};

export default NoteEditInput;
