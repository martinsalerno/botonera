import { apiURL } from '../const'

const UsersService = () => {
  const getOAuthURLs = () => {
    return fetch(`${apiURL}/oauth`, {}).then(res => res.json());
  };

  return {
    getOAuthURLs: function () {
      return getOAuthURLs();
    }
  };
};

export default UsersService;
