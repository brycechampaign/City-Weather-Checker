import React from 'react';

const Location = ({ isFavorited, name, temperature, toggleFavorite }) => {
  return (
    <div className="location">
      {name}
      {temperature}
      <button onClick={() => toggleFavorite(name)}>Favorite</button>
    </div>
  );
};

export default Location;
