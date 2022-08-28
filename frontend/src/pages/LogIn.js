import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import AuthService from '../services/AuthService';
import UserForm from '../components/UserForm';

export default function LogIn() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    AuthService.login({
      email: data.get('email'),
      password: data.get('password'),
    }).then((data) => {
      localStorage.setItem('email', data.email);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    }).catch((err) => {
      setError(err);
    });
  };

  return (
    <UserForm formName="Log In" handleSubmit={handleSubmit} error={error} />
  );
}
