import React, { useState } from 'react';

import Badge from 'react-bootstrap/Badge'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import styled from 'styled-components'

const Options = ({ onToggle }) => {
  const [checked, setChecked] = useState(false);

  const onChange = (isChecked) => {
    setChecked(isChecked);
    onToggle(isChecked);
  };

  return (
    <Navbar>
      <Nav variant="pills" className="mr-auto">
        <Nav.Item variant="dark">
          <ButtonGroup toggle>
            <ToggleButtonCustom type="checkbox"
              variant="outline-dark" onChange={(e) => onChange(e.currentTarget.checked)}
              checked={checked}>SPAM MODE</ToggleButtonCustom>
          </ButtonGroup>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

const ToggleButtonCustom = styled(ToggleButton)`
  color: #8f8f8f;
  font-weight: 200;
  border-color: #8f8f8f;

  &.btn-outline-dark.btn.active, &:active.btn-outline-dark.btn, &:hover {
    background-color: black;
  }
`

export default Options;
