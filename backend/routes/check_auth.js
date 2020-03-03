// middleware to check JWT Auth

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // extract token from bearer header
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.jwtData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};