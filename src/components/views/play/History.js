import React, { forwardRef } from 'react';

import styled from 'styled-components'

const History = forwardRef((props, ref) => {
  return (
    <HistoryHolder>
      <InvisibleInput type="text" onKeyPress={props.onKeyPress} spellCheck="false"
                      ref={ref} autoFocus readOnly />
      <KeysHistory>{props.history.join("")}</KeysHistory>
    </HistoryHolder>
  );
});

const HistoryHolder = styled.div`
  min-height: 20vh;
  max-height: 20vh;
  margin-top: 10vh;
`

const KeysHistory = styled.h6`
  padding-top: 5vh;
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

export default History;
