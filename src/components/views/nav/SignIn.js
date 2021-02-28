import React from 'react';

import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import Icon from '../../Icon'

const SignIn = ({ google, facebook }) => {
  return (
    <ButtonGroup toggle>
      <Button href={google} variant="light">
        <Icon svg="/assets/google.svg" />
      </Button>
      <Button href={facebook} variant="light">
        <Icon svg="/assets/facebook.svg" />
      </Button>
    </ButtonGroup>
  )
};

export default SignIn;
