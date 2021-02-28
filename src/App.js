import React, { useState, useEffect } from 'react';
import Edit from './components/views/edit/Edit'
import Play from './components/views/play/Play'
import NavBar from './components/views/nav/NavBar'
import Empty from './components/views/empty/Empty'
import Container from 'react-bootstrap/Container'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import keyboardsService from './services/keyboards'
import usersService from './services/users'

import { themes } from './const'
import { AuthContext } from './contexts/auth'

const App = () => {
  const [activeView, setActiveView]         = useState("2");
  const [activeKeyboard, setActiveKeyboard] = useState({ id: null, keys: [] });
  const [userData, setUserData]             = useState({});

  const onSelect = (value) => {
  	setActiveView(value);
  };

  const refreshKeyboard = (keyboardId) => {
    keyboardsService().get(keyboardId).then(keyboard => setActiveKeyboard(keyboard));
  };

  useEffect(() => {
    usersService().getMe()
      .then(userData => {
        setUserData(userData);
        setActiveKeyboard(userData.default_keyboard);
        setActiveView("2")
      })
      .catch(_ => {
        setActiveView("1")
      })
  }, []);

  const views = {
    "1": <Empty />,
    "2": <Play keyboard={activeKeyboard} theme={themes.default} />,
    "3": <Edit keyboard={activeKeyboard} refreshKeyboard={refreshKeyboard} />
  };

  return (
    <Container>
      <AuthContext.Provider value={userData}>
        <NavBar disabled={activeView === "1"} active={activeView} play="2" edit="3" onSelect={onSelect} />
        {views[activeView]}
      </AuthContext.Provider>
    </Container>
  );
}

export default App;
