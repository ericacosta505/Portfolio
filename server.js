const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send({ error: 'All fields are required.' });
    }

    const transporter = nodemailer.createTransport({
        service: 'iCloud',
        auth: {
            user: process.env.ICLOUD_EMAIL,
            pass: process.env.ICLOUD_PASSWORD,
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.ICLOUD_EMAIL,
        subject: `Portfolio Contact Form Submission from ${name}`,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ success: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ error: 'Failed to send message.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});