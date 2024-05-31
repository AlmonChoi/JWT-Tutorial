const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path')

let config = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config', 'settings.json'), 'utf8'));

verifyToken = (req, res, next) => {

    let token=req.header('Authorization');

    // If token not provided in HTTP header, get from cookie
    if (!token) {
        token = req.cookies.token;
    }

    if (!token) return res.status(401).json({ error: 'Access denied' });
        try {
            const decoded = jwt.verify(token, config['jwtKey']);
            req.userId = decoded.userId;
            next();
        } catch (error) {
            res.status(401).json({ error: 'Invalid jwt token' });
        }
};

module.exports = verifyToken;