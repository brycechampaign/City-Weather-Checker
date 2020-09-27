import React, { useState, useEffect } from 'react';
import SavedList from './SavedList';
import largestCities from '../largestCitiesList';
import { getCityWeather } from '../APIHelpers';

const Home = () => {
  const getSaved = () => JSON.parse(localStorage.getItem('savedCities'));
  const getWeatherData = () => JSON.parse(localStorage.getItem('weatherData'));

  const updateCitiesList = (newList) => {
    localStorage.setItem('savedCities', JSON.stringify(newList));
    setLocations(JSON.parse(localStorage.getItem('savedCities')));
  };

  const [locations, setLocations] = useState(getSaved());
  const [weatherData, setWeatherData] = useState(getWeatherData());

  useEffect(() => {
    if (locations !== null) {
      const weatherData = {};

      // Get weather data for each city
      locations.forEach(async (location) => {
        const cityData = await getCityWeather(location.name, location.country);
        weatherData[`${location.name}${location.country}`] = cityData.data;

        // When weather data for each city is collected, update localStorage and state
        // This has to be done in order to wait for the asynchronous calls in the forEach statement to be completed beforehand
        if (Object.keys(weatherData).length === locations.length) {
          localStorage.setItem('weatherData', JSON.stringify(weatherData));
          setWeatherData(getWeatherData());
        }
      });
    }
  }, [locations]);

  if (locations === null) {
    updateCitiesList(
      largestCities.map((city) => {
        return {
          name: city[0],
          country: city[1],
          isFavorite: false,
          notes: [],
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

  const removeCityFromSaved = (cityName) => {
    const cities = getSaved();

    for (let i = 0; i < cities.length; i++) {
      const currCity = cities[i];

      if (currCity.name === cityName) {
        cities.splice(i, 1);
        break;
      }
    }

    updateCitiesList(cities);
  };

  return (
    <>
      <h1>City Weather Checker</h1>
      {locations === null ? null : (
        <SavedList
          locations={locations}
          toggleFavorite={toggleFavorite}
          removeCityFromSaved={removeCityFromSaved}
          weatherData={weatherData}
        />
      )}
    </>
  );
};

export default Home;
