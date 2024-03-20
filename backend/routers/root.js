// routes.js

const express = require("express");
const { User} = require('../models/userinfo');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secretKey } = require('../config/auth');

router.get('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        
        // Find user in the database by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare password with stored hash
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid  password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, username: user.username }, secretKey, { expiresIn: '7d' });

        // Send token in response
        res.status(200).json({ token });
        

      
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
