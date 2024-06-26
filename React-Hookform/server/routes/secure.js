const express = require('express');
const path = require('path')
const router = express.Router();
const colors = require('colors');
const verifyToken = require('./middleware/authMiddleware');

// route require token

router.get('/api', verifyToken, (req, res) => {
    console.log(colors.green(`User ID in token is ${req.userId}`));
    res.status(200).json({ message: `Secure route accessed by ${req.userId}` });
});

router.get('/test', (req, res) => {
    res.status(200).json({ message: `Secure route without token required` });
});


module.exports = router;