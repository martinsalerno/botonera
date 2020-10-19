import React from 'react';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

const Uploader = (props) => {

  return (
  	<Row>
      <Form.File custom>
        <Form.File.Input isValid />
        <Form.File.Label data-browse="MP3">Subir audio</Form.File.Label>
        <Form.Control.Feedback type="valid">Audio subido!</Form.Control.Feedback>
      </Form.File>
    </Row>
  );
};

export default Uploader;

