const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const svgCaptcha = require('svg-captcha');
const cookieParser = require('cookie-parser');
const auth = require('./auth');

const app = express();

// Enable CORS for frontend requests
app.use(cors({
    origin: 'http://localhost:8080', // Adjust if your frontend is on a different port
    credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser()); // Add cookie parser middleware

// Store CAPTCHA values (in a real app, use Redis or another session store)
const captchaStore = new Map();

// Generate CAPTCHA endpoint
app.get('/api/captcha', (req, res) => {
    const captcha = svgCaptcha.create();
    const captchaId = Date.now().toString();
    
    // Store the CAPTCHA text with an ID
    captchaStore.set(captchaId, captcha.text);
    
    // Set a cookie with the CAPTCHA ID
    res.cookie('captchaId', captchaId, { httpOnly: true, sameSite: 'none', secure: false });
    
    // Send the CAPTCHA image
    res.type('svg');
    res.status(200).send(captcha.data);
});

// Verify CAPTCHA endpoint
app.post('/api/verify-captcha', (req, res) => {
    const { captchaInput } = req.body;
    const captchaId = req.cookies.captchaId;
    
    if (!captchaId || !captchaStore.has(captchaId)) {
        return res.status(400).json({ success: false, message: 'CAPTCHA expired or invalid' });
    }
    
    const storedCaptcha = captchaStore.get(captchaId);
    
    // Remove the CAPTCHA from store regardless of success (one-time use)
    captchaStore.delete(captchaId);
    
    if (captchaInput.toLowerCase() !== storedCaptcha.toLowerCase()) {
        return res.status(400).json({ success: false, message: 'Invalid CAPTCHA' });
    }
    
    res.json({ success: true, message: 'CAPTCHA verified' });
});

// Auth endpoints
app.post('/api/signup', auth.signup); 
app.get('/api/getSalt', auth.getSalt);
app.post('/api/login', auth.login);

const PORT = process.env.PORT || 3000; // Changed to match frontend expectations
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
