import React, {createContext, useState} from 'react';
import AuthService from '../services/AuthService';

const UserContext = createContext({email: '', token: '', expiresIn: 0});

const UserProvider = ({children}) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({email: '', token: '', expiresIn: 0});

  // Login updates the user data with a name parameter
  const login = ({email, password}) => {
    return AuthService.login({email, password}).then((data) => {
      setUser({
        email: data.email,
        token: data.token,
        tokenExpireTime: Date.now() + data.tokenExpiresIn,
      });
      localStorage.setItem('token', token);
    });
  };

  // Logout updates the user data to default
  const logout = () => {
    return AuthService.logout().then(() => {
      setUser({
        email: '',
        token: '',
        expiresIn: 0,
      });
      localStorage.removeItem('token');
    });
  };

  return (
    <UserContext.Provider value={{user, login, logout}}>
      {children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext};
