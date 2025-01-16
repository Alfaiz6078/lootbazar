// otpController.js
const  sendOtp  = require('../Helper/twilioService');

// Generate a 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP Endpoint
const sendOtpHandler = async (req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({ message: "Phone number is required" });
    }

    const otp = generateOtp(); // Generate OTP
    try {
        await sendOtp(phoneNumber, otp);
        res.status(200).json({ message: "OTP sent successfully", otp });  // For testing purposes, send the OTP back (remove this in production)
    } catch (error) {
        res.status(500).json({ message: "Failed to send OTP", error: error.message });
    }
};

module.exports = { sendOtpHandler };