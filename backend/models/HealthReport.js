const mongoose = require('mongoose');

const healthReportSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bloodPressure: String,
    cholesterol: String,
    // Add more fields as needed
});

module.exports = mongoose.model('HealthReport', healthReportSchema);
