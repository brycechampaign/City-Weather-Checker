import React, { useState, useEffect } from 'react';
import SavedList from './SavedList';
import largestCities from '../largestCitiesList';
import { getCityWeather } from '../APIHelpers';
import Search from './Search';

const Home = () => {
  const getSaved = () => JSON.parse(localStorage.getItem('savedCities'));
  const getWeatherData = () => JSON.parse(localStorage.getItem('weatherData'));

  const [locations, setLocations] = useState(getSaved());
  const [weatherData, setWeatherData] = useState(getWeatherData());

  const updateCitiesList = (newList) => {
    localStorage.setItem('savedCities', JSON.stringify(newList));
    setLocations(newList);
  };

  // Every time locations is updated, gather weather data for saved cities and add it
  // to local storage as well as state
  useEffect(() => {
    let unmounted = false;
    if (locations !== null) {
      const weatherData = {};

      // Get weather data for each city
      locations.forEach(async (location) => {
        const { name, country, region, id } = location;
        const cityData = await getCityWeather(name, region, country);
        weatherData[`${id}`] = cityData.data;

        // When weather data for each city is collected, update localStorage and state
        // This has to be done in order to wait for the asynchronous calls in the forEach statement to be completed beforehand
        if (Object.keys(weatherData).length === locations.length) {
          // get existing weather data from local storage
          const existingWeatherData = getWeatherData();

          localStorage.setItem(
            'weatherData',
            JSON.stringify({ ...existingWeatherData, ...weatherData })
          );
          if (!unmounted) {
            setWeatherData(getWeatherData());
          }
        }
      });
    }

    return () => {
      unmounted = true;
    };
  }, [locations]);

  // When the component mountss and saved locations are loaded into state,
  // fetch weather data for saved cities
  useEffect(() => {
    let unmounted = false;
    if (locations !== null) {
      const weatherData = {};

      // Get weather data for each saved city
      locations.forEach(async (location) => {
        const { name, country, region, id } = location;
        const cityData = await getCityWeather(name, region, country);
        weatherData[`${id}`] = cityData.data;

        // Reset weather data in local storage to only include data for saved cities
        // Otherwise results weather data remains forever even after page reload
        if (Object.keys(weatherData).length === locations.length) {
          localStorage.setItem('weatherData', JSON.stringify(weatherData));
          if (!unmounted) {
            setWeatherData(getWeatherData());
          }
        }
      });
    }
  }, []);

  // When weatherData in state is updated, store it's value in local storage
  useEffect(() => {
    if (weatherData !== null) {
      localStorage.setItem('weatherData', JSON.stringify(weatherData));
    }
  }, [weatherData]);

  // If local storage has no list of cities (new user or local storage has been emptied)
  if (locations === null) {
    // Load the default city list into local storage and state
    updateCitiesList(
      largestCities.map((city) => {
        return {
          id: city[2],
          name: city[0],
          country: city[1],
          isFavorite: false,
          notes: [],
        };
      })
    );
  }

  const addCityToSaved = async (city, isFavorite) => {
    city.isFavorite = isFavorite;

    const savedCities = getSaved();

    const cityWeather = await getCityWeather(
      city.name,
      city.region,
      city.country
    ).then((data) => data.data);

    // Get weather data from local storage and add new city weather to it
    const currWeather = getWeatherData();
    currWeather[city.id] = cityWeather;

    // Update local storage
    localStorage.setItem('weatherData', JSON.stringify(currWeather));
    setWeatherData(currWeather);

    // Add city to saved cities in state
    updateCitiesList([...savedCities, city]);
  };

  const toggleFavorite = async (city) => {
    let isSaved = false;
    const cities = getSaved();
    const { id } = city;

    for (let i = 0; i < cities.length; i++) {
      const currCity = cities[i];

      if (currCity.id === id) {
        // City was found in saved list so simply toggle isFavorite
        cities[i].isFavorite = !currCity.isFavorite;
        isSaved = true;
        break;
      }
    }

    if (!isSaved) {
      // City is a search result and should be added to the saved list
      addCityToSaved(city, true);
    } else {
      updateCitiesList(cities);
    }
  };

  const removeCityFromSaved = (id) => {
    const cities = getSaved();

    for (let i = 0; i < cities.length; i++) {
      const currCity = cities[i];

      if (currCity.id === id) {
        cities.splice(i, 1);
        break;
      }
    }

    updateCitiesList(cities);
  };

  return (
    <>
      {locations === null ? null : (
        <SavedList
          locations={locations}
          toggleFavorite={toggleFavorite}
          removeCityFromSaved={removeCityFromSaved}
          weatherData={weatherData}
        />
      )}
      <Search
        toggleFavorite={toggleFavorite}
        weatherData={weatherData}
        setWeatherData={setWeatherData}
        locations={locations}
      />
    </>
  );
};

export default Home;
