const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send({ error: "All fields are required." });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.mail.me.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.ICLOUD_EMAIL,
      pass: process.env.ICLOUD_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.ICLOUD_EMAIL,
    to: process.env.ICLOUD_EMAIL,
    subject: `Portfolio Contact Form Submission from ${name}`,
    text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ success: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ error: "Failed to send message." });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
