import React, { useState, useEffect } from 'react';
import Keyboard from './components/keyboard'
import Editor from './components/editor'
import Key from './components/key'
import KeyEdit from './components/keyEdit'
import Container from 'react-bootstrap/Container'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import keyboardsService from './services/keyboards'
import soundsService from './services/sounds'
import { AuthContext } from './contexts/auth'

import { themes } from './const'

const App = () => {
  const [editing, setEditing] = useState(false);
  const [keyClass, setKeyClass] = useState(Key);
  const [keyboards, setKeyboards] = useState([]);
  const [selectedKeyboard, setSelectedKeyboard] = useState(null);
  const [sounds, setSounds] = useState([]);

  const onEditionClick = () => {
  	if (editing) {
  		setEditing(false);
  		setKeyClass(Key);
  	} else {
  		setEditing(true);
  		setKeyClass(KeyEdit);
  	};
  }

  const handleSelect = (eventKey) => {
    console.log(keyboardsService().getAll(10));
  };

  useEffect(() => {
    keyboardsService().getAll(10).then(kbs => {
      setKeyboards(kbs);
      setSelectedKeyboard(kbs[0])
    });
    soundsService().getAll(10).then(sds => setSounds(sds));

  }, []);

  return (
    <AuthContext.Provider>
      <Container>
        <Nav className="justify-content-center" activeKey="1" onSelect={handleSelect}>
          <NavDropdown title="Keyboards" id="nav-dropdown" style={{width: "30vh", border: "solid whitesmoke", textAlign: "center"}}>
            <NavDropdown.Item eventKey="1.1"><strong>Nuevo</strong></NavDropdown.Item>
            <NavDropdown.Divider />
            {keyboards.map((keyboard) => {
              return <NavDropdown.Item eventKey="1.2">{keyboard.name}</NavDropdown.Item>
            })}
          </NavDropdown>
          <NavDropdown title="Sounds" id="nav-dropdown" style={{width: "30vh", border: "solid whitesmoke", textAlign: "center"}}>
            <NavDropdown.Item eventKey="2.1"><strong>Nuevo</strong></NavDropdown.Item>
            <NavDropdown.Divider />
            {sounds.map((sound) => {
              return <NavDropdown.Item eventKey="2.2">{sound.name}</NavDropdown.Item>
            })}
          </NavDropdown>
        </Nav>
        <Editor checked={editing} onClick={onEditionClick} />
        <Keyboard style={{height: "90vh"}} keyClass={keyClass} keyboard={selectedKeyboard} editing={editing} theme={themes.default} />
      </Container>
    </AuthContext.Provider>
  );
}

export default App;
