const jwt = require('jsonwebtoken');

verifyToken = (req, res, next) => {

    let token=req.header('Authorization');

    // If token not provided in HTTP header, get from cookie
    if (!token) {
        token = req.cookies.token;
    }

    if (!token) return res.status(401).json({ error: 'Access denied' });
        try {
            jwtKey = process.env.JWT_KEY || "jwt secret key" 
            const decoded = jwt.verify(token, jwtKey);
            req.userId = decoded.userId;
            next();
        } catch (error) {
            res.status(401).json({ error: 'Invalid jwt token' });
        }
};

module.exports = verifyToken;