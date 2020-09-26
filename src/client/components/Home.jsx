import React, { useState, useEffect } from 'react';
import SavedList from './SavedList';
import largestCities from '../largestCitiesList';

const Home = () => {
  const getSaved = () => JSON.parse(localStorage.getItem('savedCities'));

  const updateCitiesList = (newList) => {
    localStorage.setItem('savedCities', JSON.stringify(newList));
    setLocations(JSON.parse(localStorage.getItem('savedCities')));
  };

  const [locations, setLocations] = useState(getSaved());

  if (locations === null) {
    // Need to make request to API for additional city weather info in the future
    updateCitiesList(
      largestCities.map((city) => {
        return {
          name: city,
          isFavorite: false,
        };
      })
    );
  }

  const toggleFavorite = (cityName) => {
    const cities = getSaved();

    for (let i = 0; i < cities.length; i++) {
      const currCity = cities[i];

      if (currCity.name === cityName) {
        cities[i].isFavorite = !currCity.isFavorite;
        break;
      }
    }

    updateCitiesList(cities);
  };

  return (
    <>
      <h1>City Weather Checker</h1>
      {locations === null ? null : (
        <SavedList locations={locations} toggleFavorite={toggleFavorite} />
      )}
    </>
  );
};

export default Home;
