import axios from 'axios';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

export const getCityWeather = async (city, region, country) => {
  return await axios.get('/weather', {
    params: { city, region, country },
  });
};

export const searchCities = async (searchTerm) => {
  return await axios
    .get('/cities', {
      params: {
        searchTerm,
      },
    })
    .then((results) => results.data.data);
};
