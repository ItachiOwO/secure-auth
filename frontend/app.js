document.addEventListener("DOMContentLoaded", function () {
    // Load CAPTCHA when page loads
    const captchaImage = document.getElementById('captcha-image');
    if (captchaImage) {
        loadCaptcha();
    }

    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            let username = document.getElementById("signup-username").value;
            let password = document.getElementById("signup-password").value;
            let captchaInput = document.getElementById("captcha-input").value;

            if (password.length < 8) {
                alert("Password must be at least 8 characters long.");
                return;
            }

            // First verify CAPTCHA
            try {
                const captchaResponse = await fetch('http://localhost:3000/api/verify-captcha', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ captchaInput }),
                    credentials: 'include'
                });

                const captchaResult = await captchaResponse.json();
                if (!captchaResult.success) {
                    alert('Invalid CAPTCHA. Please try again.');
                    loadCaptcha(); // Reload CAPTCHA
                    return;
                }

                const { hash, salt } = await hashPassword(password);

                let response = await fetch('http://localhost:3000/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ username, passwordHash: hash, salt })
                });

                let result = await response.json();
                alert(result.message);

                if (result.success) {
                    window.location.href = "login.html";
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during signup. Please try again.');
                loadCaptcha();
            }
        });
    }

    // Add event listener for login form if present
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            
            const username = document.getElementById("login-username").value;
            const password = document.getElementById("login-password").value;
            
            try {
                // Get salt for this user
                const saltResponse = await fetch(`http://localhost:3000/api/getSalt?username=${encodeURIComponent(username)}`, {
                    credentials: 'include'
                });
                
                const saltData = await saltResponse.json();
                if (!saltData.success) {
                    alert('Username not found');
                    return;
                }
                
                // Hash the password with the retrieved salt
                const encoder = new TextEncoder();
                const data = encoder.encode(password + saltData.salt);
                const hashBuffer = await crypto.subtle.digest('SHA-256', data);
                const hash = Array.from(new Uint8Array(hashBuffer))
                    .map(b => b.toString(16).padStart(2, '0'))
                    .join('');
                
                // Send login request
                const loginResponse = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ username, passwordHash: hash })
                });
                
                const result = await loginResponse.json();
                alert(result.message);
                
                if (result.success) {
                    window.location.href = "index.html";
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during login. Please try again.');
            }
        });
    }
});

// Function to load and refresh CAPTCHA
async function loadCaptcha() {
    try {
        const captchaImg = document.getElementById('captcha-image');
        if (!captchaImg) return;
        
        const response = await fetch('http://localhost:3000/api/captcha', {
            credentials: 'include'
        });
        
        const svgBlob = await response.blob();
        captchaImg.src = URL.createObjectURL(svgBlob);
    } catch (error) {
        console.error('Error loading CAPTCHA:', error);
    }
}

// Add refresh CAPTCHA button functionality
const refreshButton = document.getElementById('refresh-captcha');
if (refreshButton) {
    refreshButton.addEventListener('click', loadCaptcha);
}
