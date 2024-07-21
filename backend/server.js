const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const healthReportRoutes = require('./routes/healthReport');
const { authMiddleware } = require('./middleware/auth');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use('/uploads', express.static('uploads'));

// Route setup
app.use('/api/auth', authRoutes);
app.use('/api/health-report', authMiddleware, healthReportRoutes);

// BMI Calculation Route
app.post('/api/calculate-bmi', (req, res) => {
    const { weight, height } = req.body;
    if (!weight || !height) {
        return res.status(400).json({ error: 'Weight and height are required' });
    }
    const bmi = weight / (height * height);
    res.json({ bmi });
});

// Connect to MongoDB and start server
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => console.log(`Server running on http://localhost:${port}`)))
    .catch(err => console.error('Database connection error:', err));
