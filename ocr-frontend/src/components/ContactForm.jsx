// src/components/ContactForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './ContactForm.css'; // You can add specific styles for this component if needed

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    query: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/contact`, formData);
      alert(response.data.message);
    } catch (error) {
      alert('Failed to send email.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          style={{ textTransform: 'capitalize' }}
          required
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          required
        />
      </div>
      <div>
        <label>Query:</label>
        <textarea
          name="query"
          value={formData.query}
          onChange={handleChange}
          placeholder="Enter your query"
          required
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;

