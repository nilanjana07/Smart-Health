// backend/controllers/healthReportController.js
const HealthReport = require('../models/HealthReport');
const Tesseract = require('tesseract.js');

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

exports.uploadHealthReport = async (req, res) => {
  try {
    const image = req.files.image;
    const userId = req.user.id;

    Tesseract.recognize(image.data, 'eng', {
      logger: m => console.log(m)
    }).then(async ({ data: { text } }) => {
      const reportData = parseHealthReport(text);
      const healthReport = new HealthReport({
        userId,
        ...reportData
      });
      await healthReport.save();
      res.json({ success: true, report: healthReport });
    }).catch(err => {
      res.status(500).json({ error: 'Error processing image' });
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload health report' });
  }
};
