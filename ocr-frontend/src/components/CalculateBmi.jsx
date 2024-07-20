import React, { useState } from 'react';
import axios from 'axios';

const CalculateBmi = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const handleCalculateBmi = async () => {
    try {
      const response = await axios.post('/api/calculate-bmi', { weight, height });
      setBmi(response.data.bmi);
    } catch (error) {
      console.error('Error calculating BMI:', error);
    }
  };

  return (
    <div>
      <h2>Calculate BMI</h2>
      <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
      <input type="number" placeholder="Height (m)" value={height} onChange={(e) => setHeight(e.target.value)} />
      <button onClick={handleCalculateBmi}>Calculate</button>
      {bmi && <p>Your BMI is: {bmi}</p>}
    </div>
  );
};

export default CalculateBmi;
