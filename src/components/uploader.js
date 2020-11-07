import React, { useState } from 'react';

import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import soundsService from '../services/sounds'


const Uploader = (props) => {
  const [file, setFile] = useState(null);
  const [label, setLabel] = useState("Subir audio");
  const [valid, setValid] = useState(false);

  const handleChange = (e) => {
  	const file = e.target.files[0];
  	if (file) {
  		// TODO: validate size and extension
  		// file.size
  		// file.type
  		setFile(file);
  		setLabel(file.name);

      soundsService().new(10, file.name).then(res => {
        soundsService().upload(res.url, file).then(res => {
          soundsService().create(10, file.name);
        })
      })
    };
  };

  return (
	<Col md={{ span: 8, offset: 2 }}> 
      <Form.File custom>
        <Form.File.Input isValid={valid} onChange={handleChange} onSubmit={handleChange} />
        <Form.File.Label data-browse={props.char}>{label}</Form.File.Label>
        <Form.Control.Feedback tooltip type="valid">{"ok!"}</Form.Control.Feedback>
      </Form.File>
    </Col>
  );
};

export default Uploader;

