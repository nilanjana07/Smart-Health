import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Welcome to the Health Tracking Dashboard</h1>
      <div className="links">
        <Link to="/calculate-bmi">Calculate BMI</Link>
        <Link to="/upload-image">Upload Health Report</Link>
      </div>
    </div>
  );
};

export default Dashboard;

