async function loadCaptcha() {
    const captchaImg = document.getElementById('captcha-image');
    const response = await fetch('/api/captcha');
    const svgBlob = await response.blob();
    captchaImg.src = URL.createObjectURL(svgBlob);
}

async function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const captcha = document.getElementById('captcha-input').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, captchaInput: captcha }),
            credentials: 'include' // Important for cookies
        });

        if (response.ok) {
            window.location.href = '/dashboard';
        } else {
            const error = await response.json();
            alert(error.message);
            loadCaptcha(); // Reload CAPTCHA after failed attempt
        }
    } catch (error) {
        console.error('Login error:', error);
    }
}