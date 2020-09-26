import React from 'react';

const Location = ({
  isFavorited,
  name,
  temperature,
  toggleFavorite,
  removeCityFromSaved,
}) => {
  return (
    <div className="location">
      {name}
      {temperature}
      <button onClick={() => toggleFavorite(name)}>Favorite</button>
      <button onClick={() => removeCityFromSaved(name)}>Delete</button>
    </div>
  );
};

export default Location;
