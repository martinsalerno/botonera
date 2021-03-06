import React from 'react';

import usersService from '../../../services/users'
import Icon from '../../Icon'

import styled from 'styled-components'

const SignOut = ({ email, provider }) => {
  const logOut = () => {
    usersService().logOut();
  };

  return (
    <LogOutDiv>
      <SpanMarginRight>{`${email} (${provider})`}</SpanMarginRight>
      <Icon svg="/assets/box-arrow-right.svg" onClick={logOut} />
    </LogOutDiv>
  )
};

const SpanMarginRight = styled.span`
  margin-right: 10px;
`

const LogOutDiv = styled.div`
  display: flex;
  align-items: center;
`

export default SignOut;
