const { Router } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

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

            return res.status(201).json({ message: 'Пользователь создан' });
        } catch (e) {
            return res.status(500).json({ message: 'Серверная ошибка' });
        }
    }
);

module.exports = router;
