const HealthReport = require('../models/HealthReport');
const Tesseract = require('tesseract.js');

exports.uploadHealthReport = async (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).send('No file uploaded.');
    }

    const image = req.files.image;

    Tesseract.recognize(image.tempFilePath, 'eng', {
        logger: m => console.log(m)
    })
    .then(async ({ data: { text } }) => {
        const report = parseHealthReport(text);
        const notifications = notifyHealthFactors(report);

        const newReport = new HealthReport({
            userId: req.user._id,
            ...report
        });

        const savedReport = await newReport.save();
        res.json({ text, report, notifications, savedReport });
    })
    .catch(err => {
        console.error('Tesseract Error:', err);
        res.status(500).send('Error processing image');
    });
};

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





