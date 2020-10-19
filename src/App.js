import React, { useState } from 'react';
import Keyboard from './components/keyboard'
import Editor from './components/editor'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { themes } from './const'


const App = () => {
  const [editing, setEditing] = useState(false);

  const onEditionClick = () => {
  	setEditing(prevState => !prevState);
  }

  return (
    <div className="App">
      <Editor checked={editing} onClick={onEditionClick} />
      <Keyboard editing={editing} theme={themes.default} />
    </div>
  );
}

export default App;
