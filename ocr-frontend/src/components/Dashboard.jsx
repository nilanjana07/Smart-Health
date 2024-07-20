import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <Link to="/calculate-bmi">Calculate BMI</Link>
        <Link to="/upload-image">Upload Health Report</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
};

export default Dashboard;
