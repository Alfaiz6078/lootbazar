const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(express.json());
const sendOtp = require('./Helper/sendsms');

// Connect to MongoDB
mongoose.connect('mongodb+srv://faizal:Guru%40786@cluster0.01ig5.mongodb.net/lootbazar?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Generate random OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Base Route
app.get('/', (req, res) => {
    res.send('Hello, Loot Bazar!');
});

app.use('/api/frontend', userRoutes);

// app.post('/send-otp', async (req, res) => {
//     sendOtp('+918264451744')
//     .then((sid) => {
//         console.log('OTP sent successfully. Verification SID:', sid);
//     })
//     .catch((error) => {
//         console.error('Failed to send OTP:', error.message);
//     });
// });


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
