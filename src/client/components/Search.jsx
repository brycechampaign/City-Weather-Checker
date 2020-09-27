import React, { useState } from 'react';
import { searchCities } from '../APIHelpers';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cities = await searchCities(searchTerm);
    console.log(cities);
  };

  return (
    <div>
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
    </div>
  );
};

export default Search;
