import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import AuthService from '../services/AuthService';
export default function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  function onLogout() {
    AuthService.logout();
    navigate('/login');
  }

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Factorial Metrics Explorer
          </Typography>
          {!token && (
            <Button component={RouterLink} color="inherit" to="/login">
              Login
            </Button>
          )}
          {!token && (
            <Button component={RouterLink} color="inherit" to="/signup">
              Signup
            </Button>
          )}
          {token && (
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
