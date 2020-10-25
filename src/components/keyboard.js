import './keyboard.css';

import React, { useRef, useState } from 'react';
import { charCodes, charConfig, charSounds } from  '../const'

import Container from 'react-bootstrap/Container'
import DropzoneUploader from './dropzoneUploader'
import Key from './key'
import KeyEdit from './keyEdit'
import Player from './player'
import Row from 'react-bootstrap/Row'
import styled from 'styled-components'

const Keyboard = (props) => {
  const keys = {};
  const playerRef = useRef(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState([]);
  const [history, setHistory] = useState([]);
  const [keyEditing, setKeyEditing] = useState(null);

  const AddRef = (key) => {
    keys[key] = useRef(null);

    return keys[key]
  };

  const onKeyPress = (key) => {
    if (keys[key] && keys[key].current) {
      if (key === "space") {
        keys[key].current.noop();

        deregisterAll();
        setKeyEditing(null);
      } else {
        keys[key].current.toggle();

        if (props.editing) {
          setKeyEditing(key);
          // document.querySelector("#exampleModalCenter").modal('show');
        };
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

  console.log(keyEditing);

  return (
    <React.Fragment>
      <Container fluid onClick={() => playerRef.current.focus()} className="Keyboard">
        <Row style={{height: "40%"}} className="justify-content-md-center">
          <Player onKeyPress={(event) => onKeyPress(charCodes[event.charCode])}
                  history={history}
                  ref={playerRef} />
        </Row>
        <ContainerFlex style={{height: "40%", textAlign: "center", alignItems: "center"}}>
          {props.theme.layout.map((rowKeys, i) => {
            return (
              <Row key={i} className="justify-content-md-center">
                {rowKeys.map((key, j) =>
                  <props.keyClass key={key+j} 
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
        </ContainerFlex>
      {props.editing && keyEditing ? <DropzoneUploader char={keyEditing} /> : null}
      </Container>
    </React.Fragment>
  );
}

const ContainerFlex = styled(Container)`
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default Keyboard;
