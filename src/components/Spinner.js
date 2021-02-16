import React from 'react';

import BoostrapSpinner from 'react-bootstrap/Spinner'

import styled from 'styled-components'

const Spinner = () => {
  return (
    <BoostrapSpinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </BoostrapSpinner>
  )
};

export default Spinner;
