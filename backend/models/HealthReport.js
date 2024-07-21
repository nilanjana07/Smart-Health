const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HealthReportSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bloodPressure: {
        type: String
    },
    cholesterol: {
        type: String
    },
    // Add other health factors as needed
}, { timestamps: true });

module.exports = mongoose.model('HealthReport', HealthReportSchema);

