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
          localStorage.setItem('weatherData', JSON.stringify(weatherData));
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

  useEffect(() => {
    if (weatherData !== null) {
      localStorage.setItem('weatherData', JSON.stringify(weatherData));
    }
  }, [weatherData]);

  if (locations === null) {
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

  const addCityToSaved = async (city, isFavorite = false) => {
    city.isFavorite = isFavorite;

    const savedCities = getSaved();

    const cityWeather = await getCityWeather(
      city.name,
      city.region,
      city.country
    );

    const currWeather = getWeatherData();
    currWeather[city.id] = cityWeather;

    localStorage.setItem('weatherData', JSON.stringify(currWeather));
    setWeatherData(getWeatherData());

    updateCitiesList([...savedCities, city]);
  };

  const toggleFavorite = async (city) => {
    let isSaved = false;
    const cities = getSaved();
    const { id } = city;

    for (let i = 0; i < cities.length; i++) {
      const currCity = cities[i];

      if (currCity.id === id) {
        cities[i].isFavorite = !currCity.isFavorite;
        isSaved = true;
        break;
      }
    }

    if (!isSaved) {
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
      />
    </>
  );
};

export default Home;
