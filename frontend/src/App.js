import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import {PrivateRoutes} from './helpers/PrivateRoutes';
import Dashboard from './pages/Dashboard';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import InsertMetric from './pages/InsertMetric';

function App() {
  const isLogged = !!localStorage.getItem('token');
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route
            element={
              isLogged ? (
                <Navigate replace to="/dashboard" />
              ) : (
                <Navigate replace to="/login" />
              )
            }
            path="/"
          />
          <Route element={<LogIn />} path="/login" exact />
          <Route element={<SignUp />} path="/signup" exact />
          <Route element={<PrivateRoutes />}>
            <Route element={<Dashboard />} path="/dashboard" exact />
            <Route element={<InsertMetric />} path="/insert" exact />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
