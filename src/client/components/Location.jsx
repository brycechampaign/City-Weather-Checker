import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as faHeartReg,
  faTrashAlt as faTrashReg,
} from '@fortawesome/free-regular-svg-icons';

const Location = ({
  isFavorite,
  name,
  temperature,
  toggleFavorite,
  removeCityFromSaved,
  region,
  country,
  countryCode,
  city,
  id,
}) => {
  const [isHoveringFavorite, setIsHoveringFavorite] = useState(false);
  const [isHoveringDelete, setIsHoveringDelete] = useState(false);

  const subtitle = region ? `${region}, ${countryCode || country}` : country;

  const favoriteIcon =
    isFavorite || isHoveringFavorite ? (
      <FontAwesomeIcon icon={faHeart} className="favorite-icon fa-2x" />
    ) : (
      <FontAwesomeIcon icon={faHeartReg} className="favorite-icon fa-2x" />
    );

  const deleteIcon = isHoveringDelete ? (
    <FontAwesomeIcon icon={faTrashAlt} className="fa-2x" />
  ) : (
    <FontAwesomeIcon icon={faTrashReg} className="fa-2x" />
  );

  return (
    <Link
      to={`/city/${id}/${`${name}, ${country}`}`}
      style={{ textDecoration: 'none' }}
    >
      <div className="location">
        <div className="location-container">
          <span
            className="favorite-icon-container"
            onClick={() => toggleFavorite(city)}
            onMouseEnter={() => setIsHoveringFavorite(true)}
            onMouseLeave={() => setIsHoveringFavorite(false)}
          >
            {favoriteIcon}
          </span>
          <div className="location-label">
            <p className="location-top-text">{name}</p>
            <p className="location-bottom-text">{subtitle}</p>
          </div>
        </div>
        <div className="location-container">
          <p className="location-temperature">{`${temperature} °C`}</p>
          {removeCityFromSaved === null ? null : (
            <span
              onClick={() => removeCityFromSaved(id)}
              onMouseEnter={() => setIsHoveringDelete(true)}
              onMouseLeave={() => setIsHoveringDelete(false)}
            >
              {deleteIcon}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Location;
