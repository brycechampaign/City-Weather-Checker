import React from 'react';
import Location from '../components/Location';

const ResultsList = ({ results, toggleFavorite, weatherData, locations }) => {
  // map for keeping track of favorited locations
  const favoriteMap = {};
  locations.forEach((location) => {
    favoriteMap[location.id] = location.isFavorite;
  });

  return (
    <div id="results-list">
      {results.map((city) => {
        const { name, country, region, id, countryCode } = city;
        const temp = weatherData[id].temperature;

        return (
          <Location
            name={name}
            key={id}
            country={country}
            countryCode={countryCode}
            region={region}
            toggleFavorite={toggleFavorite}
            removeCityFromSaved={null}
            temperature={temp}
            city={city}
            id={id}
            isFavorite={favoriteMap[id]}
          />
        );
      })}
    </div>
  );
};

export default ResultsList;
