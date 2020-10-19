import React, { useState, useRef } from 'react';

import Container from 'react-bootstrap/Container'
import { charCodes, charConfig, charSounds } from  '../const'
import Row from 'react-bootstrap/Row'
import Key from './key'
import KeyEdit from './keyEdit'
import './keyboard.css';
import Player from './player'
import Uploader from './uploader'

const Keyboard = (props) => {
  const keys = {};
  const playerRef = useRef(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState([]);
  const [history, setHistory] = useState([]);

  const AddRef = (key) => {
    keys[key] = useRef(null);

    return keys[key]
  };

  const onKeyPress = (key) => {
    if (keys[key] && keys[key].current) {
      if (key === "space") {
        keys[key].current.noop();

        deregisterAll();
      } else {
        keys[key].current.toggle();
      }
    }
  };

  const register = (key) => {
    setHistory(prevHistory => [...prevHistory, key]);
    setCurrentlyPlaying(prevPlaying => [...prevPlaying, key]);
  };

  const deregister = (key) => {
    setCurrentlyPlaying(prevPlaying => {
      let index = prevPlaying.indexOf(key);

      if (index > -1) {
        prevPlaying.splice(index, 1);
      };

      return prevPlaying;
    });
  };

  const deregisterAll = () => {
    const dupPlaying = [...currentlyPlaying];

    dupPlaying.forEach((key) => keys[key].current.off());
  };

  return (
    <Container fluid onClick={() => playerRef.current.focus()} className="Keyboard">
      <Row className="justify-content-md-center">
        <Player onKeyPress={(event) => onKeyPress(charCodes[event.charCode])}
                history={history}
                ref={playerRef} />
      </Row>

      {props.theme.layout.map((rowKeys, i) => {
        return (
          <Row key={i} className="justify-content-md-center">
            {rowKeys.map((key, j) =>
              <Key key={key+j} 
                   disabled={charConfig[key].disabled}
                   backgroundColor={charConfig[key].backgroundColor}
                   onClick={onKeyPress}
                   onSoundOn={register}
                   onSoundOff={deregister}
                   char={key}
                   ref={AddRef(key)}
                   audio={charSounds[key]} />
            )}
          </Row>
        )
      })}

      <Uploader />
    </Container>
  );
}

export default Keyboard;
