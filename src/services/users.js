import { apiURL } from '../const'
import { AuthenticatedRequest } from './helpers'

const UsersService = () => {
  const getOAuthURLs = () => {
    return fetch(`${apiURL}/oauth`, {}).then(res => res.json());
  };

  const getMe = () => {
    return AuthenticatedRequest('/me', {}).then(res => res.json());
  };

  const logOut = () => {
    return AuthenticatedRequest('/logout', {
      method: "POST"
    });
  };

  return {
    getOAuthURLs: function () {
      return getOAuthURLs();
    },
    getMe: function () {
      return getMe()
    },
    logOut: function () {
      return logOut()
    }
  };
};

export default UsersService;
