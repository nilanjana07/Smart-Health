import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalculateBmi from './components/CalculateBmi';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import UploadImage from './components/UploadImage';
import ContactForm from './components/ContactForm';
import './App.css';
import HomePage from './components/HomePage';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/calculate-bmi" element={<CalculateBmi />} />
          <Route path="/upload-image" element={<UploadImage />} />
          <Route path="/contact" element={<ContactForm />} /> {/* Added ContactForm route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;




