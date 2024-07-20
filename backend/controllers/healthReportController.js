const HealthReport = require('../models/HealthReport');

exports.createReport = async (req, res) => {
    try {
        const { userId } = req.user;
        const { reportData } = req.body;
        const healthReport = new HealthReport({
            user: userId,
            ...reportData
        });
        await healthReport.save();
        res.status(201).json({ message: 'Health report saved successfully', healthReport });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getReports = async (req, res) => {
    try {
        const { userId } = req.user;
        const reports = await HealthReport.find({ user: userId });
        res.status(200).json(reports);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
