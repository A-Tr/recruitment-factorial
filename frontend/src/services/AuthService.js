import {post} from '../helpers/Fetch';

export const login = ({email, password}) => {
  return post(
      `${process.env.REACT_APP_API_BASE_URL}/api/users/login`,
      undefined,
      {email, password},
  );
};

export const signUp = ({email, password}) => {
  return post(
      `${process.env.REACT_APP_API_BASE_URL}/api/users/signup`,
      undefined,
      {email, password},
  );
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
