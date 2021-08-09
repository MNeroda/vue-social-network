const { Router } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = new Router();

async function createRefreshToken(userId, fingerPrint) {
    const refreshToken = jwt.sign({}, config.get('jwtSecret'), {
        expiresIn: '60d',
    });
    const refreshTokenDecrypted = jwt.verify(
        refreshToken,
        config.get('jwtSecret')
    );
    const refreshTokenInBd = new RefreshToken({
        userId,
        refreshToken: refreshToken,
        fingerPrint,
        expiresIn: refreshTokenDecrypted.exp,
    });
    await refreshTokenInBd.save();
    return refreshToken;
}

function createAccessToken(userId) {
    return jwt.sign({ userId }, config.get('jwtSecret'), { expiresIn: '20m' });
}

function setRefreshCookie(res, refreshToken) {
    res.cookie('refresh_token', refreshToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60),
        /*expires = милисекунды * секунды * минуты * часы * дни*/
        httpOnly: true,
    });
}

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
                    messageType: 'error',
                    errors: errors.array(),
                });
            }

            const { email, password, name, phone } = req.body;
            const possibleUser = await User.findOne({ email });

            if (possibleUser) {
                return res.status(400).json({
                    message: 'Такой пользователь уже существует',
                    messageType: 'error',
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({
                email,
                password: hashedPassword,
                name,
                phone,
            });
            await user.save();

            const refreshToken = await createRefreshToken(
                user._id,
                req.body.fingerPrint
            );
            const accessToken = createAccessToken(user.id);

            setRefreshCookie(res, refreshToken);
            return res.status(201).json({
                accessToken,
                message: 'Пользователь создан',
                messageType: 'success',
            });
        } catch (e) {
            return res
                .status(500)
                .json({ message: 'Серверная ошибка', messageType: 'error' });
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
                    messageType: 'error',
                });
            }

            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({
                    message: 'Такого пользователя не существует',
                    messageType: 'error',
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ message: 'Неверный пароль', messageType: 'error' });
            }
            //Удаление прошлых рефреш токенов
            await RefreshToken.deleteMany({ userId: user._id });

            const refreshToken = await createRefreshToken(
                user._id,
                req.body.fingerPrint
            );
            const accessToken = createAccessToken(user.id);

            setRefreshCookie(res, refreshToken);

            return res.status(200).json({
                accessToken,
                userId: user.id,
                message: 'Вы успешно вошли в систему',
                messageType: 'success',
            });
        } catch (e) {}
    }
);

router.get('/test', async (req, res) => {
    console.log(req.header);
    return res.status(200).json({ message: 'test' });
});

router.get('/refresh-token', async (req, res) => {
    try {
        const refreshTokenFromRequest = req.cookies['refresh_token'];
        let tokenInBd = await RefreshToken.findOne({
            refreshToken: refreshTokenFromRequest,
        });
        if (req.query.fingerPrint !== tokenInBd.fingerPrint) {
            return res.status(401).json({
                message:
                    'Похоже вы зашли с другого браузера, попробуйте войти снова',
                messageType: 'error',
            });
        }
        if (tokenInBd.expiresIn * 1000 < Date.now()) {
            return res.status(401).json({
                message:
                    'Срок действия вашей сессии истек, войдите в систему снова',
                messageType: 'error',
            });
        }
        await RefreshToken.deleteMany({ userId: tokenInBd.userId });
        const refreshToken = await createRefreshToken(
            tokenInBd.userId,
            tokenInBd.fingerPrint
        );
        const accessToken = await createAccessToken(tokenInBd.userId);

        setRefreshCookie(res, refreshToken);

        return res.status(200).json({ accessToken });
    } catch (e) {
        res.status(401).json({
            message: 'Ошибка доступа: перезайдите в систему',
            messageType: 'error',
        });
    }
});

router.get('/logout', (req, res) => {
    res.cookie('refresh_token', null, {
        expires: new Date(0),
        /*expires = милисекунды * секунды * минуты * часы * дни*/
        httpOnly: true,
    });
    return res
        .status(200)
        .json({
            message: 'Вы успешно вышли из системы',
            messageType: 'success',
        });
});

module.exports = router;
