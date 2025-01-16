require('dotenv').config();
const twilio = require('twilio');
// Initialize Twilio client
const accountSid = 'AC904f6c551b00b1e6a85fa2e6ced90e06';
const authToken = '2ee4511667913f40d8581b3e1f6ce2fa';
const twilioPhoneNumber = '+918264451744';
const client = twilio(accountSid, authToken);
// console.log("Account SID:", accountSid);
// console.log("Auth Token:", authToken);

const sendOtp = async (phoneNumber, otp) => {
    try {
        const message = await client.messages.create({
            body: `Your OTP code is: ${otp}`,
            from: twilioPhoneNumber, 
            to: phoneNumber  
        });
        console.log("OTP sent successfully!", message.sid);
        return message;
    } catch (error) {
        console.error("Error sending OTP:", error.message);
        throw error;
    }
};

module.exports = sendOtp;
