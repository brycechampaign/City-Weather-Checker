import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Note from './Note';

const Notes = ({ cityId }) => {
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState([]);

  const getNotesFromStorage = () => JSON.parse(localStorage.getItem('notes'));

  useEffect(() => {
    let notesObj = getNotesFromStorage();

    if (notesObj === null) {
      localStorage.setItem('notes', JSON.stringify({}));
      notesObj = getNotesFromStorage();
    }

    const cityNotes = notesObj[cityId];

    if (cityNotes) {
      setNotes(cityNotes);
    } else {
      setNotes([]);
    }
  }, []);

  const handleChange = (e) => {
    setNoteText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currNotes = getNotesFromStorage();

    if (currNotes[cityId]) {
      currNotes[cityId].push({ text: noteText, id: Date.now() });
    } else {
      currNotes[cityId] = [{ text: noteText, id: Date.now() }];
    }

    localStorage.setItem('notes', JSON.stringify(currNotes));
    setNotes(getNotesFromStorage()[cityId]);
  };

  return (
    <div id="notes-container">
      <h1>Notes</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="search">
          <textarea
            type="text"
            id="notes-term"
            value={noteText}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit" className="search-button">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </form>
      <div id="notes-list">
        {notes.map((note) => (
          <Note text={note.text} key={note.id} />
        ))}
      </div>
    </div>
  );
};

export default Notes;
