import React from 'react';
import Location from './Location';

const sortCitiesByName = ([...list]) => {
  return list.sort((a, b) => {
    var name1 = a.name.toUpperCase();
    var name2 = b.name.toUpperCase();
    return name1 < name2 ? -1 : name1 > name2 ? 1 : 0;
  });
};

const SavedList = ({
  locations,
  toggleFavorite,
  removeCityFromSaved,
  weatherData,
}) => {
  const sortedLocations = sortCitiesByName(locations);
  const favorites = [];

  for (let i = 0; i < sortedLocations.length; i++) {
    const currLocation = sortedLocations[i];

    // if location is favorited, remove it from sortedLocations and
    // add it to favorites array
    if (currLocation.isFavorite) {
      favorites.push(currLocation);
      sortedLocations.splice(i, 1);
      i -= 1;
    }
  }

  return (
    <>
      <h2 id="saved-heading">Saved</h2>
      <div id="saved-list-wrapper">
        <div id="savedList">
          {favorites.concat(sortedLocations).map((location) => {
            const {
              name,
              country,
              region,
              id,
              isFavorite,
              countryCode,
            } = location;
            const temp =
              weatherData === null ? null : weatherData[id].temperature;

            return (
              <Location
                name={name}
                key={id}
                country={country}
                countryCode={countryCode}
                region={region}
                toggleFavorite={toggleFavorite}
                removeCityFromSaved={removeCityFromSaved}
                temperature={temp}
                city={location}
                id={id}
                isFavorite={isFavorite}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SavedList;
