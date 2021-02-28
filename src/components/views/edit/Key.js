import React from 'react';

import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

const Key = (props) => {
  return (
    <ButtonKey
      variant={props.disabled ? "outline-light" : "outline-success"}
      className={props.disabled}
      disabled={props.disabled}
      onChange={() => props.onClick(props.char)}>
      {props.char}
    </ButtonKey>
  );
};

const ButtonKey = styled(Button)`
  padding: 0px;
  width: 35px;
  height: 35px;
`

export default Key;
