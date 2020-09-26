import React, { useState, useEffect } from 'react';
import SavedList from './SavedList';
import largestCities from '../largestCitiesList';

const Home = () => {
  const [locations, setLocations] = useState(
    JSON.parse(localStorage.getItem('savedCities'))
  );

  if (locations === null) {
    // Need to make request to API for additional city weather info in the future
    localStorage.setItem(
      'savedCities',
      JSON.stringify(
        largestCities.map((city) => {
          return {
            name: city,
            isFavorite: false,
          };
        })
      )
    );

    setLocations(JSON.parse(localStorage.getItem('savedCities')));
  }

  return (
    <>
      <h1>City Weather Checker</h1>
      {locations === null ? null : <SavedList locations={locations} />}
    </>
  );
};

export default Home;
