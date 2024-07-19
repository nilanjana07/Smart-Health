import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [image, setImage] = useState(null);
    const [extractedText, setExtractedText] = useState('');
    const [report, setReport] = useState(null);
    const [notifications, setNotifications] = useState([]);

    const handleBmiSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/api/calculate-bmi', { weight, height });
        setBmi(response.data.bmi);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleImageUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        const response = await axios.post('http://localhost:5000/api/extract-text', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        setExtractedText(response.data.text);
        setReport(response.data.report);
        setNotifications(response.data.notifications);
    };

    return (
        <div>
            <h1>Health Tracker</h1>
            <form onSubmit={handleBmiSubmit}>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight (kg)" required />
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height (m)" required />
                <button type="submit">Calculate BMI</button>
            </form>
            {bmi && <p>BMI: {bmi}</p>}

            <form onSubmit={handleImageUpload}>
                <input type="file" onChange={handleImageChange} required />
                <button type="submit">Upload Image</button>
            </form>
            {extractedText && <pre>{extractedText}</pre>}
            {report && (
                <div>
                    <h2>Health Report</h2>
                    <pre>{JSON.stringify(report, null, 2)}</pre>
                </div>
            )}
            {notifications.length > 0 && (
                <div>
                    <h2>Notifications</h2>
                    <ul>
                        {notifications.map((notification, index) => (
                            <li key={index}>{notification}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ImageUpload;


