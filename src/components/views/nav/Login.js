import React, { useState, useEffect } from 'react';

import usersService from '../../../services/users'

import SignIn from './SignIn'
import SignOut from './SignOut'

import { AuthContext } from '../../../contexts/auth'

const Login = (props) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    usersService().getOAuthURLs().then(urls => setAuth(urls));
  }, []);

  return (
    <AuthContext.Consumer>
      { userData =>
          userData.email
          ? <SignOut email={userData.email} provider={userData.oauth_provider} />
          : <SignIn google={auth.google} facebook={auth.facebook} />
      }
    </AuthContext.Consumer>
  )
};

export default Login;
