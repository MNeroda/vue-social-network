const { Router } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const authMiddleware = require('../middleware/auth.middleware');

const router = new Router();

router.post(
    '/register',
    [
        check('email', 'Неверный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({
            min: 6,
        }),
        check('name', 'Минимальная длина имени 2 символа').isLength({ min: 2 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Неверные данные при регистрации',
                    errors: errors.array(),
                });
            }

            const { email, password, name, phone } = req.body;
            const possibleUser = await User.findOne({ email });

            if (possibleUser) {
                return res
                    .status(400)
                    .json({ message: 'Такой пользователь уже существует' });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({
                email,
                password: hashedPassword,
                name,
                phone,
            });
            await user.save();


            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                {expiresIn: '1y'}
            );

            return res.status(201).json({
                message: 'Пользователь создан',
                token,
                userId: user._id,
            });
        } catch (e) {
            return res.status(500).json({ message: 'Серверная ошибка' });
        }
    }
);

router.post(
    '/login',
    [
        check('email', 'Введите корректный email'),
        check('password', 'Введите пароль'),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Неверный логин или пароль',
                });
            }

            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res
                    .status(400)
                    .json({ message: 'Такого пользователя не существует' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль' });
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '10h' }
            );

            res.status(200).json({ token, userId: user.id });
        } catch (e) {}
    }
);

router.get('/check-auth', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, config.get('jwtSecret'))
        res.status(200).json({login: true})
    } catch (e) {
        res.status(200).json({login: false})
    }
});

module.exports = router;
