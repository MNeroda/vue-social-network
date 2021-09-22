const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers['access-token'];

        if (!token) {
            return res
                .status(401)
                .json({ message: 'Нет авторизации', messageType: 'error' });
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'));
        if (decoded.exp * 1000 < Date.now()) {
            return res
                .status(401)
                .json({ message: 'Нет авторизации', messageType: 'error' });
        }
        req.userId = decoded.userId;
        next();
    } catch (e) {
        return res
            .status(401)
            .json({ message: 'Нет авторизации', messageType: 'error' });
    }
};
