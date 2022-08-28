import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import AuthService from '../services/AuthService';
import UserForm from '../components/UserForm';

export default function SignUp() {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    AuthService.signUp({
      email: data.get('email'),
      password: data.get('password'),
    }).then(() => {
      navigate('/login');
    }).catch((err) => {
      setError(err);
    });
  };

  return (
    <UserForm formName="Sign Up" handleSubmit={handleSubmit} error={error} />
  );
}
