import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const Spinner = () => {
  return <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />;
};

export default Spinner;
