import React from 'react';
import Location from '../components/Location';

const ResultsList = ({ results, toggleFavorite, weatherData }) => {
  return (
    <div id="results-list">
      {results.map((city) => {
        const { name, country, region } = city;
        const temp = weatherData[`${name}${region}${country}`].temperature;

        return (
          <Location
            name={name}
            key={`${name}${region}${country}`}
            country={country}
            region={region}
            toggleFavorite={toggleFavorite}
            removeCityFromSaved={null}
            temperature={temp}
          />
        );
      })}
    </div>
  );
};

export default ResultsList;
