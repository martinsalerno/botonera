import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { charCodes, charConfig } from '../../../const'

import Container from 'react-bootstrap/Container'
import Key from './Key'
import Row from 'react-bootstrap/Row'

import styled from 'styled-components'

const Keyboard = forwardRef((props, ref) => {
  const [sounds, setSounds] = useState({});

  useImperativeHandle(ref, () => ({
    onKeyPress: (key) => {
      onKeyPress(key);
    }
  }));

  useEffect(() =>
    setSounds(
      Object.values(charCodes).reduce((accum, key) => {
        if (props.keyboard.keys[key]) {
          let audio = new Audio(props.keyboard.keys[key].sound_url);

          audio.onloadstart = function() {
            setSounds((prevSounds) => ({
              ...prevSounds,
              [key]: { ...prevSounds[key], loading: true }
            }))
          };
          audio.oncanplay = function() {
            setSounds((prevSounds) => ({
              ...prevSounds,
              [key]: { ...prevSounds[key], loading: false }
            }))
          };
          audio.onplay = function() {
            setSounds((prevSounds) => ({
              ...prevSounds,
              [key]: { ...prevSounds[key], playing: true }
            }))
          };
          audio.onpause = function() {
            setSounds((prevSounds) => ({
              ...prevSounds,
              [key]: { ...prevSounds[key], playing: false }
            }))
          };
          audio.onended = function() {
            setSounds((prevSounds) => ({
              ...prevSounds,
              [key]: { ...prevSounds[key], playing: false }
            }))
          };

          return {
            ...accum,
            [key]: { audio: audio, playing: false, loading: false }
          };
        };

        return null;
      }, {}) || {}
    ), [props.keyboard]);

  const deregister = (key) => {
    sounds[key].audio.pause();
    sounds[key].audio.currentTime = 0;
  };

  const deregisterAll = () => {
    Object.keys(sounds).forEach((key) => {
      deregister(key);
    })
  };

  const onKeyPress = (key) => {
    if (key === "space") {
      return deregisterAll();
    };

    if (!sounds[key].playing) {
      sounds[key].audio.play();
      return
    }

    sounds[key].audio.currentTime = 0;

    if (props.spamActive) {
      sounds[key].audio.play();
    } else {
      sounds[key].audio.pause();
    };
  };

  return (
    <ContainerFlex>
      {props.theme.layout.map((rowKeys, i) => {
        return (
          <Row key={i} className="justify-content-md-center">
            {rowKeys.map((key, j) =>
              <Key key={key+j} 
                   backgroundColor={charConfig[key].backgroundColor}
                   onClick={() => onKeyPress(key)}
                   char={key}
                   spam={charConfig[key].spam}
                   checked={sounds[key] ? sounds[key].playing : false}
                   disabled={props.keyboard.keys[key] && props.keyboard.keys[key].sound_name == null}
                   loading={sounds[key] ? sounds[key].loading : false}
                   soundName={props.keyboard.keys[key] && props.keyboard.keys[key].sound_name ? props.keyboard.keys[key].sound_name : "empty!"}
              />
            )}
          </Row>
        )
      })}
    </ContainerFlex>
  );
});

const ContainerFlex = styled(Container)`
  text-align: center;
  align-items: center;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5vh;
`

export default Keyboard;
