const express = require('express');
const router = express.Router();
const { createReport, getReports } = require('../controllers/healthReportController');

router.post('/create', createReport);
router.get('/all', getReports);

module.exports = router;
