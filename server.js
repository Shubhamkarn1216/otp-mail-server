require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 10000;

// Fixed receiver email
const FIXED_EMAIL = "shbhmkrn@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post("/send-otp", async (req, res) => {
  const { otp } = req.body;   // OTP will be passed by you

  if (!otp) {
    return res.status(400).json({ message: "OTP is required" });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: FIXED_EMAIL,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error });
  }
});

app.get("/", (req, res) => {
  res.send("OTP Mail Server Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
