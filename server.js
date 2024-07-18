// server.js
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const Tesseract = require('tesseract.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());

const port = 5000;

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
        }
        else
      {
        notifications.push('Blood pressure is normal! That is great! ');
      }
    }
    if (report.cholesterol) {
        const cholesterol = Number(report.cholesterol);
        if (cholesterol > 200) {
            notifications.push('Cholesterol level is high. Please consult a doctor.');
         

        }
        else
      {
        notifications.push('Cholesterol level is normal! Good job');
      }
    }
    // Add more notifications for other health factors
    return notifications;
};

app.post('/api/calculate-bmi', (req, res) => {
    const { weight, height } = req.body;
    const bmi = weight / (height * height);
    res.json({ bmi });
});

app.post('/api/extract-text', (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).send('No file uploaded.');
    }
    const image = req.files.image;
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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


