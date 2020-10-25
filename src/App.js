import React, { useState } from 'react';
import Keyboard from './components/keyboard'
import Editor from './components/editor'
import Key from './components/key'
import KeyEdit from './components/keyEdit'
import Container from 'react-bootstrap/Container'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { themes } from './const'


const App = () => {
  const [editing, setEditing] = useState(false);
  const [keyClass, setKeyClass] = useState(Key);

  const onEditionClick = () => {
  	if (editing) {
  		setEditing(false);
  		setKeyClass(Key);
  	} else {
  		setEditing(true);
  		setKeyClass(KeyEdit);
  	};
  }

  return (
    <Container>
      <Editor checked={editing} onClick={onEditionClick} />
      <Keyboard style={{height: "90vh"}} keyClass={keyClass} editing={editing} theme={themes.default} />
    </Container>
  );
}

export default App;
