import React, { useState } from 'react';
import { searchCities, getCityWeather } from '../APIHelpers';
import ResultsList from './ResultsList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = ({ toggleFavorite, weatherData, setWeatherData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [hasWeatherData, setHasWeatherData] = useState(false);
  // const [resultsWeatherData, setResultsWeatherData] = useState(null);

  const getWeatherData = (cities) => {
    const newWeatherData = {};

    cities.forEach(async (city) => {
      const { name, region, country, id } = city;
      const cityData = await getCityWeather(name, region, country);
      newWeatherData[id] = cityData.data;

      // When weather data for each city is collected, update state
      // This has to be done in order to wait for the asynchronous calls in the forEach statement to be completed beforehand
      if (Object.keys(newWeatherData).length === cities.length) {
        setWeatherData({ ...weatherData, ...newWeatherData });
        setHasWeatherData(true);
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
      <div className="searchbar-wrap">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="search">
            <input
              type="text"
              className="search-term"
              placeholder="Search for a city"
              value={searchTerm}
              onChange={(e) => handleChange(e)}
            />
            <button type="submit" className="search-button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </form>
      </div>

      {results.length > 0 && hasWeatherData ? (
        <ResultsList
          results={results}
          toggleFavorite={toggleFavorite}
          weatherData={weatherData}
        />
      ) : null}
    </div>
  );
};

export default Search;
