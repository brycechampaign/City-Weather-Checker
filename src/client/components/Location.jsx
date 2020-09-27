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
  const subtitle = region ? `${region}, ${country}` : country;

  return (
    <div className="location">
      <div className="location-container">
        <button onClick={() => toggleFavorite(name)}>Favorite</button>
        <div className="location-label">
          <p className="location-top-text">{name}</p>
          <p className="location-bottom-text">{subtitle}</p>
        </div>
      </div>
      <div className="location-container">
        <p className="location-temperature">{`${temperature} °C`}</p>
        {removeCityFromSaved === null ? null : (
          <button onClick={() => removeCityFromSaved(name)}>Delete</button>
        )}
      </div>
    </div>
  );
};

export default Location;
