// backend/routes/healthReport.js
const express = require('express');
const router = express.Router();
const healthReportController = require('../controllers/healthReportController');
const { authMiddleware } = require('../middleware/auth');

router.post('/upload', authMiddleware, healthReportController.uploadHealthReport);

module.exports = router;
