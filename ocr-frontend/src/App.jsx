import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalculateBmi from './components/CalculateBmi';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import UploadImage from './components/UploadImage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/calculate-bmi" element={<CalculateBmi />} />
          <Route path="/upload-image" element={<UploadImage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



