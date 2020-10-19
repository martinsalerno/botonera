import React, { forwardRef, useImperativeHandle, useState } from 'react';

import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import styled from 'styled-components'

const Key = forwardRef((props, ref) => {
  const [audio] = useState(new Audio("/" + props.audio));
  const [playing, setPlaying] = useState(false);

  useImperativeHandle(ref, () => ({
    toggle: () => {
      toggle();
    },
    on: () => {
      on();
    },
    off: () => {
      off();
    },
    noop: () => {
      noop();
    }
  }));

  const toggle = () => {
    if (playing) {
      off();
    } else {
      on();
    };
  };

  const on = () => {
    setPlaying(true);

    audio.play();
    props.onSoundOn(props.char);
  }

  const off = () => {
    setPlaying(false);

    audio.load();
    props.onSoundOff(props.char); 
  };

  const noop = () => {
    setPlaying(true);

    setTimeout(() => {
      setPlaying(false);
    }, 100);
  };

  const renderTooltip = (propsTooltip, audio) => (
    <Tooltip {...propsTooltip}>
      {props.audio}
    </Tooltip>
  );

  audio.onended = function() {
    setPlaying(false);
  };

  return (
    <ButtonHolder>
      <ButtonGroup toggle className="mb-2">
        <OverlayTrigger placement="right"
                  delay={{ show: 250, hide: 250 }}
                  overlay={renderTooltip}>
          <ToggleButtonCustom type="checkbox"
                        variant={props.disabled ? "outline-light" : "outline-success"}
                        className={props.disabled}
                        checked={playing}
                        disabled={props.disabled}
                        onChange={() => props.onClick(props.char)}>
            {props.char}
          </ToggleButtonCustom>
        </OverlayTrigger>
      </ButtonGroup>
    </ButtonHolder>
  );
});

const ButtonHolder = styled.div`
  margin: 0 0.25em;
`

const ToggleButtonCustom = styled(ToggleButton)`
  &.disabled {
    color: transparent;
    background-color: rgba(0, 0, 0, 0.05);
  }
`

export default React.memo(Key, () => true);
