const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // "Bear TOKEN"
        if (!token) {
            return res.status(401).json({ message: "no autorization" })
        };
        const decodedToken = jwt.verify(token, config.get('jwtSecret'));
        req.user = decodedToken;
        next();

    } catch (e) {
        res.status(401).json({ message: "no autorization" })

    }
}