const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const healthReportRoutes = require('./routes/healthReport');
const { authMiddleware } = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/health-report', authMiddleware, healthReportRoutes);

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => console.log(`Server running on http://localhost:${port}`)))
  .catch(err => console.error(err));

app.post('/api/calculate-bmi', (req, res) => {
  const { weight, height } = req.body;
  const bmi = weight / (height * height);
  res.json({ bmi });
});
