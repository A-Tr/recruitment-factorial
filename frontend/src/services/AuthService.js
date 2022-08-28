import {post} from '../helpers/Fetch';

export const login = ({email, password}) => {
  return post('http://localhost:4000/api/users/login', undefined, {email, password});
};

export const signUp = ({email, password}) => {
  return post('http://localhost:4000/api/users/signup', undefined, {email, password});
};


export const logout = () => {
  localStorage.removeItem('email');
  localStorage.removeItem('token');
};

const AuthService = {
  login,
  logout,
  signUp,
};

export default AuthService;
