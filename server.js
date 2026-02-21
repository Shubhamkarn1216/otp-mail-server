const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post("/send-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`
    });

    res.json({ message: "OTP sent successfully" });
  }catch (error) {
  console.error("SMTP ERROR:", error);
  res.status(500).json({ error: error.message });
}
});

app.listen(3000, () => console.log("Server running"));
