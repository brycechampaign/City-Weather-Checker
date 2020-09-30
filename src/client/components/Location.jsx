import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
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

  // If there is no region provided, display just the country
  //  if there is a region and a countryCode, display the countryCode
  //  if there is a region and no countryCode, display the country
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

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(city);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    removeCityFromSaved(id);
  };

  return (
    <Link
      to={`/city/${id}/${`${name}, ${country}`}`}
      style={{ textDecoration: 'none' }}
    >
      <div className="location">
        <div className="location-container">
          <span
            className="favorite-icon-container"
            onClick={(e) => handleFavoriteClick(e)}
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
          <p className="location-temperature">
            {temperature ? `${temperature} °C` : <Spinner />}
          </p>
          {removeCityFromSaved === null ? null : (
            <span
              onClick={(e) => handleDeleteClick(e)}
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
