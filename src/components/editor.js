import React from 'react';
import Row from 'react-bootstrap/Row'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import styled from 'styled-components'

const Editor = (props) => {
  return (
    <RowFlex>
        <ButtonGroup toggle className="mb-2">
          <ToggleButton type="checkbox"
              variant="outline-dark"
              value="1"
              checked={props.active}
              onChange={() => props.onClick()}>
            Modo edición
          </ToggleButton>
        </ButtonGroup>
    </RowFlex>
  );
};

const RowFlex = styled(Row)`
  padding: 1vw;
  flex-direction: column;
  align-items: flex-end;
  height: 10vh;
  width: 100%;
`

export default Editor;
