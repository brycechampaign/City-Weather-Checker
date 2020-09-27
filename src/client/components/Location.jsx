import React from 'react';

const Location = ({
  isFavorited,
  name,
  temperature,
  toggleFavorite,
  removeCityFromSaved,
  region,
  country,
}) => {
  return (
    <div className="location">
      <p>{name}</p>
      <p>{region}</p>
      <p>{country}</p>
      <p>{temperature}</p>
      <button onClick={() => toggleFavorite(name)}>Favorite</button>
      {removeCityFromSaved === null ? null : (
        <button onClick={() => removeCityFromSaved(name)}>Delete</button>
      )}
    </div>
  );
};

export default Location;
