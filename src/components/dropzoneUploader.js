import React, { useCallback, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { PlayFill } from "react-bootstrap-icons";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import soundsService from '../services/sounds'
import keyboardsService from '../services/keyboards'

const DropzoneUploader = (props) => {
  const [file, setFile] = useState(null);
  const [label, setLabel] = useState(null);
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    props.onClose();
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    setLabel(file.name);
  }, []);

  const onConfirm = () => {
    soundsService().new(file.name).then(newSound => {
      soundsService().upload(newSound.url, file).then(res => {
        soundsService().create(file.name).then(sound => {
          if (props.keyboard) {
            keyboardsService().addKey(props.keyboard.id, props.targetKey, sound.id)
            props.onUpload();
          };
        });
      })
    })
  }

  const onResetFile = () => {
    setFile(null);
    setLabel('');
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <DropzoneModal show={show} onHide={handleClose} centered>
      <Modal.Body>
        {!label && (
          <DropzoneContent className="modal-body" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the file here</p>
            ) : (
              <p>Drop a file here, or click to select</p>
            )}
          </DropzoneContent>
        )}
        {label && (
          <div>
            <UploadedFile>
            <div> The following file is about to be uploaded: </div>
              {label}
              <PlayFile size={30}></PlayFile>
            </UploadedFile>
            <ConfirmationButtons>
              <Button variant="outline-primary" onClick={onResetFile}>
                Change File
              </Button>
              <Button onClick={onConfirm}>Confirm</Button>
            </ConfirmationButtons>
          </div>
        )}
      </Modal.Body>
    </DropzoneModal>
  );
}

const DropzoneModal = styled(Modal)`
  text-align: center;
  padding: 15px;
`;
  
const DropzoneContent = styled.div`
  cursor: pointer;
  color: #8898aa;
  border: 1px dashed #dee2e6;

  &:hover {
    color: #525f7f;
    border-color: #8898aa;
  }
`
const ConfirmationButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 50%;
  margin: 20px auto 0;
`;

const UploadedFile = styled.div`
  margin: 40px;
  cursor: pointer;
  
  &:hover {
    font-weight: bold;
  }
`;

const PlayFile = styled(PlayFill)`
  color: green;
  margin-left: 5px;
`;


export default DropzoneUploader;
