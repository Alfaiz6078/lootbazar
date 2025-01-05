require('dotenv').config();
const twilio = require('twilio');

// Initialize Twilio client
const client = twilio(process.env.accountSid, process.env.authToken);

/**
 * Function to send OTP using Twilio Verify API
 * @param {string} phoneNumber - The recipient's phone number (in E.164 format, e.g., +1234567890)
 * @returns {Promise<string>} - Promise resolving to the verification SID
 */
const sendOtp = async (phoneNumber) => {
    try {
        const verification = await client.verify.v2
            .services(process.env.TWILIO_VERIFY_SERVICE_SID)
            .verifications.create({
                to: phoneNumber,
                channel: 'sms', // Options: 'sms', 'call', 'email' (if supported)
            });

        console.log('Verification SID:', verification.sid);
        return verification.sid;
    } catch (error) {
        console.error('Error sending OTP:', error.message);
        throw error;
    }
};

module.exports = sendOtp;
