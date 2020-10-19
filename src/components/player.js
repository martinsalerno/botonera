import React, { forwardRef } from 'react';

import styled from 'styled-components'

const Player = forwardRef((props, ref) => {
  return (
    <React.Fragment>
      <InvisibleInput type="text"
                   onKeyPress={props.onKeyPress}
                   autoFocus
                   spellCheck="false"
                   ref={ref}
                   readOnly>
      </InvisibleInput>
      <History>{props.history.join("")}</History>
    </React.Fragment>
  );
});

const History = styled.h6`
  margin: 5em 1em;
  width: 60vw;
  color: 0 0 0 #2196f3;
  background: transparent;
  text-align: center; 
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  direction: rtl;
  letter-spacing: 1em;
`

const InvisibleInput = styled.input`
  outline: 0;
  width: 0;
  height: 0;
  border-width: 0;
  border-color: transparent;
  color: transparent;
  background: transparent;
  text-align: center;
`

export default Player;
