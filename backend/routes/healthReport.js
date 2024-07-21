const express = require('express');
const router = express.Router();
const { uploadHealthReport } = require('../controllers/healthReportController');
const { authMiddleware } = require('../middleware/auth');

router.post('/upload', authMiddleware, uploadHealthReport);

module.exports = router;




