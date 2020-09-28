import React from 'react';
import Location from '../components/Location';

const ResultsList = ({ results, toggleFavorite, weatherData }) => {
  return (
    <div id="results-list">
      {results.map((city) => {
        const { name, country, region, id } = city;
        const temp = weatherData[id].temperature;

        return (
          <Location
            name={name}
            key={id}
            country={country}
            region={region}
            toggleFavorite={toggleFavorite}
            removeCityFromSaved={null}
            temperature={temp}
            city={city}
            id={id}
          />
        );
      })}
    </div>
  );
};

export default ResultsList;
