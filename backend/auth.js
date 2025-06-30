const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../database/users.json');

function loadUsers() {
    if (!fs.existsSync(usersFilePath)) return {};
    return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
}

function saveUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

const signup = (req, res) => {
    let { username, passwordHash, salt } = req.body;
    let users = loadUsers();

    if (users[username]) {
        console.log(`User ${username} already exists`);
        return res.status(400).json({ message: "User already exists" });
    }

    users[username] = { hash: passwordHash, salt };
    saveUsers(users);
    console.log(`User ${username} registered successfully`);
    res.json({ success: true, message: "User registered successfully" });
};

const getSalt = (req, res) => {
    let users = loadUsers();
    let username = req.query.username;

    if (!users[username]) {
        console.log(`User ${username} not found`);
        return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, salt: users[username].salt });
};

const login = (req, res) => {
    let { username, passwordHash } = req.body;
    let users = loadUsers();

    if (!users[username] || users[username].hash !== passwordHash) {
        console.log(`Invalid credentials for user ${username}`);
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.json({ success: true, message: "Login successful" });
};

module.exports = { signup, getSalt, login };