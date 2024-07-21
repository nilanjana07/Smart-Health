const express = require('express');
const Tesseract = require('tesseract.js');
const HealthReport = require('../models/HealthReport');

const router = express.Router();

router.post('/extract-text', async (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).send('No file uploaded.');
  }

  const image = req.files.image;

  try {
    const { data: { text } } = await Tesseract.recognize(image.data, 'eng');
    const parsedReport = parseHealthReport(text);

    const newReport = new HealthReport({
      userId: req.user.userId,
      bloodPressure: parsedReport.bloodPressure,
      cholesterol: parsedReport.cholesterol,
      // Add other health factors as needed
    });

    await newReport.save();

    const notifications = notifyHealthFactors(parsedReport);
    res.json({ text, report: parsedReport, notifications });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing image');
  }
});

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
    // Parse other health factors as needed
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
  return notifications;
};

module.exports = router;

