import React from 'react';
import { useParams } from 'react-router';

const CityInfo = () => {
  const { id, name } = useParams();
  const {
    cloudcover,
    feelslike,
    humidity,
    observation_time,
    precip,
    pressure,
    temperature,
    uv_index,
    visibility,
    weather_descriptions,
    wind_speed,
    wind_dir,
  } = JSON.parse(localStorage.getItem('weatherData'))[id];

  let uvColor;
  let uvText;
  if (uv_index <= 2) {
    uvColor = '#54960a';
    uvText = 'Low';
  } else if (uv_index <= 5) {
    uvColor = '#f7e527';
    uvText = 'Moderate';
  } else if (uv_index <= 7) {
    uvColor = '#eb5832';
    uvText = 'High';
  } else if (uv_index <= 10) {
    uvColor = '#d93d2f';
    uvText = 'Very High';
  } else {
    uvColor = '#d93d2f';
    uvText = 'Extreme';
  }

  return (
    <div id="city-info-container">
      <div id="center-info" className="card">
        <h2 id="city-info-name">{name}</h2>
        <span id="city-info-temp">{temperature} °C</span>
        <span id="feelslike-temp">Feels like {feelslike} °C</span>
        <span id="weather-description">{weather_descriptions[0]}</span>
      </div>
      <div id="bottom-info">
        <span className="card city-info-item">Cloud Cover: {cloudcover}%</span>
        <span className="card city-info-item">Humidity: {humidity}%</span>
        <span className="card city-info-item">Precipitation: {precip} MM</span>
        <span className="card city-info-item">Pressure: {pressure} MB</span>
        <span className="card city-info-item">
          Wind Speed: {wind_speed} ({wind_dir})
        </span>
        <span className="card city-info-item">visibility: {visibility} KM</span>
        <span className="card city-info-item">
          UV Index:{' '}
          <span style={{ color: uvColor }}>
            {uv_index} ({uvText})
          </span>
        </span>
      </div>
    </div>
  );
};

export default CityInfo;
