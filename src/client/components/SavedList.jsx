import React from 'react';
import Location from './Location';

const sortCitiesByName = (list) => {
  return list.sort((a, b) => {
    var name1 = a.name.toUpperCase();
    var name2 = b.name.toUpperCase();
    return name1 < name2 ? -1 : name1 > name2 ? 1 : 0;
  });
};

const SavedList = ({ locations, toggleFavorite, removeCityFromSaved }) => {
  const sortedLocations = sortCitiesByName(locations);
  const favorites = [];

  for (let i = 0; i < sortedLocations.length; i++) {
    const currLocation = sortedLocations[i];

    if (currLocation.isFavorite) {
      favorites.push(currLocation);
      sortedLocations.splice(i, 1);
      i -= 1;
    }
  }

  return (
    <>
      <h2>Saved</h2>
      <div id="savedList">
        {favorites.concat(sortedLocations).map((location) => (
          <Location
            name={location.name}
            key={location.name}
            toggleFavorite={toggleFavorite}
            removeCityFromSaved={removeCityFromSaved}
          />
        ))}
      </div>
    </>
  );
};

export default SavedList;
