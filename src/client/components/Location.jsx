import React from 'react';

const Location = ({ isFavorited, name, temperature }) => {
  return (
    <div className="location">
      {name}
      {temperature}
    </div>
  );
};

export default Location;
