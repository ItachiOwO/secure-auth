const express = require('express');
const session = require('express-session');
const svgCaptcha = require('svg-captcha');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:5500',
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/api/captcha', (req, res) => {
    const captcha = svgCaptcha.create();
    req.session.captchaText = captcha.text;
    res.type('svg').send(captcha.data);
});

app.post('/api/verify-captcha', (req, res) => {
    const { captchaInput } = req.body;
    const isValid = req.session.captchaText === captchaInput;
    res.json({ success: isValid });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});