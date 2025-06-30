<<<<<<< HEAD
# Secure Authentication System

A secure web application with user authentication featuring password hashing, salt generation, and CAPTCHA verification.

## Features

- **Secure Password Hashing**: Uses SHA-256 with unique salts for each user
- **CAPTCHA Protection**: Prevents automated bot registrations
- **User Registration & Login**: Complete authentication system
- **Session Management**: Secure session handling with cookies
- **Clean UI**: Modern and responsive user interface

## Project Structure

```
secure-auth/
├── frontend/           # Client-side application
│   ├── index.html      # Main dashboard page
│   ├── login.html      # Login page
│   ├── signup.html     # Registration page
│   ├── app.js          # Main JavaScript logic
│   ├── hash.js         # Password hashing utilities
│   ├── login.js        # Login-specific logic
│   └── styles.css      # Styling
├── backend/            # Server-side application
│   ├── server.js       # Main server file
│   ├── auth.js         # Authentication logic
│   └── package.json    # Backend dependencies
├── database/           # Database layer
│   ├── users.json      # User data storage
│   └── package.json    # Database dependencies
└── server.js           # Root server file
```

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/secure-auth.git
   cd secure-auth
   ```

2. Install dependencies for each component:
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   
   # Install database dependencies
   cd database
   npm install
   cd ..
   ```

3. Start the application:
   ```bash
   npm start
   ```
   Or run the server directly:
   ```bash
   node server.js
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. **Registration**: Navigate to the signup page, fill in your details, complete the CAPTCHA, and create an account
2. **Login**: Use your credentials to log in to the system
3. **Dashboard**: Access the main application after successful authentication

## Security Features

- **Password Hashing**: Passwords are hashed using SHA-256 with unique salts
- **CAPTCHA Verification**: Prevents automated registration attempts
- **Secure Sessions**: Session management with secure cookies
- **Input Validation**: Client and server-side validation

## API Endpoints

- `POST /api/signup` - User registration
- `POST /api/login` - User authentication
- `GET /api/getSalt` - Retrieve user salt for password hashing
- `GET /api/captcha` - Generate CAPTCHA image
- `POST /api/verify-captcha` - Verify CAPTCHA input

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: JSON file storage
- **Security**: SHA-256 hashing, CAPTCHA verification
- **Session Management**: Express sessions with secure cookies

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Security Notes

- This is a demonstration project. For production use, consider using a proper database system
- Implement additional security measures like rate limiting, stronger password policies, and two-factor authentication
- Use HTTPS in production environments
- Regularly update dependencies to patch security vulnerabilities

## Contact

If you have any questions or suggestions, please feel free to reach out or open an issue on GitHub.
