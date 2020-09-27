import axios from 'axios';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

export const getCityWeather = async (city, country) => {
  return await axios.get('/weather', {
    params: { city, country },
  });
};
