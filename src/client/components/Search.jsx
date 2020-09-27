import React, { useState } from 'react';
import { searchCities, getCityWeather } from '../APIHelpers';
import ResultsList from './ResultsList';

const Search = ({ toggleFavorite }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [resultsWeatherData, setResultsWeatherData] = useState(null);

  const getWeatherData = (cities) => {
    const weatherData = {};

    cities.forEach(async (city) => {
      const cityData = await getCityWeather(city.name, city.country);
      weatherData[`${city.name}${city.region}${city.country}`] = cityData.data;

      // When weather data for each city is collected, update state
      // This has to be done in order to wait for the asynchronous calls in the forEach statement to be completed beforehand
      if (Object.keys(weatherData).length === cities.length) {
        setResultsWeatherData(weatherData);
      }
    });
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get list of cities using search term
    const cities = await searchCities(searchTerm);
    setResults(cities);

    // Retrieve weather information for cities
    getWeatherData(cities);
  };

  return (
    <div id="search-container">
      <h2>Search</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          id="search-bar"
          type="text"
          value={searchTerm}
          onChange={(e) => handleChange(e)}
        />
        <input type="submit" value="Search" />
      </form>
      {results.length > 0 && resultsWeatherData !== null ? (
        <ResultsList
          results={results}
          toggleFavorite={toggleFavorite}
          weatherData={resultsWeatherData}
        />
      ) : null}
    </div>
  );
};

export default Search;
