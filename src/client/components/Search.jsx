import React, { useState } from 'react';
import { searchCities, getCityWeather } from '../APIHelpers';
import ResultsList from './ResultsList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = ({ toggleFavorite }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [resultsWeatherData, setResultsWeatherData] = useState(null);

  const getWeatherData = (cities) => {
    const weatherData = {};

    cities.forEach(async (city) => {
      const { name, region, country, id } = city;
      const cityData = await getCityWeather(name, region, country);
      weatherData[id] = cityData.data;

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
      <div class="searchbar-wrap">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div class="search">
            <input
              type="text"
              class="search-term"
              placeholder="Search for a city"
              value={searchTerm}
              onChange={(e) => handleChange(e)}
            />
            <button type="submit" class="search-button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </form>
      </div>

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
