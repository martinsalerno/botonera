import { apiURL } from '../const'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const AuthenticatedRequest = (uri, options) => {
  let token = cookies.get('botonera-api');

  return fetch(`${apiURL}${uri}`, {
    ...options,
  	headers: {
  	  'x-botonera-token': token
  	}
  });
};

export { AuthenticatedRequest };