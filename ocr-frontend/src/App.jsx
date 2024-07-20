import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CalculateBmi from './components/CalculateBmi';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import UploadImage from './components/UploadImage';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {isAuthenticated ? (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calculate-bmi" element={<CalculateBmi />} />
          <Route path="/upload-image" element={<UploadImage />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};

export default App;



