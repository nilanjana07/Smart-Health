const express = require('express');
const { sendEmail } = require('../services/emailService');

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        await sendEmail(
            'vitacare.fp2024@gmail.com', // To our fixed email
            `Query from ${name} (${email})`,
            message
        );
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
});

module.exports = router;





