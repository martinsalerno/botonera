import React, { useState } from 'react';

import styled from 'styled-components'

const Icon = (props) => {
  return (
	  <IconHolder>
      <HoverableImg src={props.svg} alt="" onClick={props.onClick} />
    </IconHolder>
  )
};

const IconHolder = styled.div`
	min-height: 28px;
	min-width: 28px;
	text-align: center;
`

const HoverableImg = styled.img`
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #8f8f8f;

  &:hover {
    width: calc(100% + 5px);
    height: calc(100% + 5px);
  }

  &:active {
    width: calc(100% + 8px);
    height: calc(100% + 8px);
  }
`

export default Icon;
