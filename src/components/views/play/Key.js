import React from 'react';

import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import Spinner from '../../Spinner'
import styled from 'styled-components'

const Key = (props) => {
  const renderTooltip = (propsTooltip, audio) => (
    <Tooltip {...propsTooltip}>
      {props.soundName}
    </Tooltip>
  );

  return (
      <ButtonHolder toggle className="mb-2">
        <OverlayTrigger placement="right" delay={{ show: 250, hide: 250 }} overlay={renderTooltip}>
          <ToggleButtonCustom type="checkbox" variant="outline-dark"
                        checked={props.checked}
                        disabled={props.disabled}
                        onChange={() => props.onClick()}
                        value={1}
                        color={props.char === '-' ? 'transparent' : 'initial'}
                        spam={props.spam}
          >
            {props.loading
              ? <Spinner />
              : props.char
            }
          </ToggleButtonCustom>
        </OverlayTrigger>
      </ButtonHolder>
  );
};

const ButtonHolder = styled(ButtonGroup)`
  margin: 0 0.25em;
`

const ToggleButtonCustom = styled(ToggleButton)`
  min-width: ${props => props.spam * 100}px;
  min-height: 100px;
  font-size: 20px;
  font-weight: 200;
  display: flex;
  text-align: center;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};

  &.disabled {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &.btn-outline-dark.btn.active, &:active.btn-outline-dark.btn, &:hover {
    color: white;
    background-color: black;
  }
`

export default Key;
