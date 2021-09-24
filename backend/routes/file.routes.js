/*
 * Нормального файлового хранилища нет,
 * И писать его неохото, поэтому использую firebase
 * здесь роуты для изменения данных о пользовательских файлов в бд
 * */
const { Router } = require('express');
const User = require('../models/User');

const router = new Router();

const authMiddleware = require('../middleware/auth.middleware');

router.get('/set-user-avatar', authMiddleware, async (req, res) => {
    await User.findOneAndUpdate(
        { _id: req.userId },
        { $set: { isHaveAvatar: req.query.isHaveAvatar } }
    );
    return res.status(200).json();
});

module.exports = router;
