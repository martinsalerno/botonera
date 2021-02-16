import React, { useRef, useState } from 'react';
import { charCodes, charConfig } from '../../../const'

import Container from 'react-bootstrap/Container'
import History from './History'
import Row from 'react-bootstrap/Row'
import Keyboard from './Keyboard'
import Options from './Options'
import styled from 'styled-components'

const Play = ({ keyboard, theme }) => {
  const historyRef  = useRef(null);
  const keyboardRef = useRef(null);

  const [history, setHistory]       = useState([]);
  const [spamActive, setSpamActive] = useState(false);

  const onKeyPress = (key) => {
    setHistory(prevHistory => [...prevHistory, key]);

    keyboardRef.current.onKeyPress(key);
  };

  const onOptionsToggle = (active) => {
    setSpamActive(active);
  };

  return (
      <ContainerKeyboard fluid onClick={() => historyRef.current.focus()} className="Keyboard">
        <Row style={{minheight: "25vh"}} className="justify-content-md-center">
          <History onKeyPress={(e) => onKeyPress(charCodes[e.charCode])} history={history} ref={historyRef} />
        </Row>
        <Keyboard theme={theme} keyboard={keyboard} ref={keyboardRef} spamActive={spamActive}/>
        <Row>
          <Options onToggle={onOptionsToggle} />
        </Row>
      </ContainerKeyboard>
  );
}

const ContainerKeyboard = styled(Container)`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  height: 80vh;
`

const ContainerFlex = styled(Container)`
  text-align: center;
  align-items: center;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default Play;
