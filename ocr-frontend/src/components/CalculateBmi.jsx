import React, { useState } from 'react';
import './CalculateBmi.css';

const CalculateBmi = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const calculatedBmi = weight / (height * height);
    setBmi(calculatedBmi.toFixed(2));
  };

  return (
    <div className="calculate-bmi-container">
      <h2>Calculate BMI</h2>
      <form onSubmit={handleSubmit}>
        <label>Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <label>Height (m):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <button type="submit">Calculate</button>
      </form>
      {bmi && <p>Your BMI is: {bmi}</p>}
    </div>
  );
};

export default CalculateBmi;

