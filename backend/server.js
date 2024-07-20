const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const healthReportRoutes = require('./routes/healthReport');
const { authMiddleware } = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/health-report', authMiddleware, healthReportRoutes);

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => console.log(`Server running on http://localhost:${port}`)))
    .catch(err => console.error(err));

// BMI Calculation
app.post('/api/calculate-bmi', (req, res) => {
    const { weight, height } = req.body;
    if (!weight || !height) {
        return res.status(400).json({ error: 'Weight and height are required' });
    }
    const bmi = weight / (height * height);
    res.json({ bmi });
});

// Health Report Text Extraction and Notification
app.post('/api/extract-text', (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).send('No file uploaded.');
    }
    const image = req.files.image;
    const Tesseract = require('tesseract.js');

    Tesseract.recognize(image.data, 'eng', {
        logger: m => console.log(m)
    }).then(({ data: { text } }) => {
        const report = parseHealthReport(text);
        const notifications = notifyHealthFactors(report);
        res.json({ text, report, notifications });
    }).catch(err => {
        res.status(500).send('Error processing image');
    });
});

// Helper Functions
const parseHealthReport = (text) => {
    const report = {};
    const lines = text.split('\n');
    lines.forEach(line => {
        if (line.includes('Blood Pressure')) {
            report.bloodPressure = line.split(':')[1].trim();
        }
        if (line.includes('Cholesterol')) {
            report.cholesterol = line.split(':')[1].trim();
        }
        // Add more parsing logic for other health factors
    });
    return report;
};

const notifyHealthFactors = (report) => {
    const notifications = [];
    if (report.bloodPressure) {
        const [systolic, diastolic] = report.bloodPressure.split('/').map(Number);
        if (systolic > 120 || diastolic > 80) {
            notifications.push('Blood Pressure is high. Please consult a doctor.');
        } else {
            notifications.push('Blood pressure is normal! That is great!');
        }
    }
    if (report.cholesterol) {
        const cholesterol = Number(report.cholesterol);
        if (cholesterol > 200) {
            notifications.push('Cholesterol level is high. Please consult a doctor.');
        } else {
            notifications.push('Cholesterol level is normal! Good job');
        }
    }
    // Add more notifications for other health factors
    return notifications;
};
