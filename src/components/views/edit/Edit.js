import React, { useState, useEffect } from 'react';
import { charCodes } from  '../../../const'

import DropzoneUploader from '../../DropzoneUploader'
import Key from './Key'
import Icon from '../../Icon'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from '../../Spinner'

import Container from 'react-bootstrap/Container'
import styled from 'styled-components'

const Edit = ({ keyboard, refreshKeyboard }) => {
  const [sounds, setSounds]             = useState({});
  const [selectedKey, setSelectedKey]   = useState(null);
  const [uploading, setUploading]       = useState(false);

  const onPlayClick = (key) => {
    let sound = sounds[key];

    if (sound.playing) {
      sound.audio.pause();
      sound.audio.currentTime = 0;
    } else {
      sound.audio.play();
    };
  }

  const onUploadClick = (key) => {
    setSelectedKey(key);
    setUploading(true);
  };

  const onDropZoneUpload = () => {
    setUploading(false);
    refreshKeyboard(keyboard.id);
  };

  const onDropZoneClose = () => {
    setUploading(false);
  };

  const playSVG = (key) => {
    if (sounds[key] && sounds[key].playing) {
      return "/assets/pause-circle.svg";
    };

    return "/assets/play-circle.svg";
  };

  useEffect(() =>
    setSounds(
      Object.values(charCodes).reduce((accum, key) => {
        if (keyboard.keys[key]) {
          let audio = new Audio(keyboard.keys[key].sound_url);

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
    ), [keyboard]);

  const groupElements = (array, chunkSize) => {
    let result = [];

    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }

    return result;
  }

  return (
    <Container>
      <br /> 
      {groupElements(Object.values(charCodes), 3).map((keysChunk, i) => {
        return (
          <CustomRow key={i}>
            {keysChunk.map((keyChar, j) => {
              let key = keyboard.keys[keyChar];

              return (
                <Col style={{padding: "0px", textAlign: "center"}}>
                  <Row>
                    <Col xs={1}>
                      <Key key={keyChar+j} 
                           backgroundColor={"black"}
                           char={keyChar}
                           audio={key} />
                    </Col>
                    <ContentCol xs={11}>
                      <Col xs={6}>
                        <p style={{margin: 0, paddingLeft: "20px", float: "left"}}>{key ? key.sound_name : ''}</p>
                      </Col>
                      <CustomCol xs={4}>
                        {sounds[keyChar] && sounds[keyChar].loading
                          ? <Spinner />
                          : <Icon svg={playSVG(keyChar)} width="33%" onClick={() => onPlayClick(keyChar)} />
                        }
                        <Icon svg="/assets/upload.svg"   width="33%" onClick={() => onUploadClick(keyChar)} />
                        <a href={key ? key.sound_url : ''} download={key ? key.sound_name : ''}>
                          <Icon svg="/assets/download.svg" width="33%" />
                        </a>
                      </CustomCol>
                    </ContentCol>
                  </Row>
                </Col>
              )
            })}
          </CustomRow>
        )}
      )}
      { uploading ? <DropzoneUploader onUpload={onDropZoneUpload} onClose={onDropZoneClose} keyboard={keyboard} targetKey={selectedKey} /> : null }
    </Container>
  );
}

const CustomRow = styled(Row)`
  background: ${props => props.lint ? "linear-gradient(45deg, rgba(153, 153, 153, 0.23), transparent, rgba(153, 153, 153, 0.23))" : "none"};
  padding: 8px 40px;
  align-items: center;
  border-radius: 10px 10px;
  justify-content: space-between;
  &:hover {
    box-shadow: 0 0 11px rgba(33,33,33,.5);
  }
`

const CustomCol = styled(Col)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`

const ContentCol = styled(CustomCol)`
  padding: 5px 0px;
  border-bottom: 1px solid rgba(33,33,33,.5);
`

export default Edit;
