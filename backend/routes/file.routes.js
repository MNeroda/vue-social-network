/*
 * Нормального файлового хранилища нет,
 * И писать его неохото, поэтому использую firebase
 * здесь роуты для изменения данных о пользовательских файлов в бд
 * */
const { Router } = require('express');
const User = require('../models/User');
const Photo = require('../models/Photo')

const router = new Router();

const authMiddleware = require('../middleware/auth.middleware');

router.get('/set-user-avatar', authMiddleware, async (req, res) => {
    await User.findOneAndUpdate(
        { _id: req.userId },
        { $set: { isHaveAvatar: req.query.isHaveAvatar } }
    );
    return res.status(200).json();
});

router.get('/add-new-user-photo', authMiddleware, async (req, res) => {
    const photo = new Photo({
        name: req.query.id
    })
    const user = await User.findById(req.userId)
    user.photos.push(photo._id)
    await user.save()
    await photo.save()
    return res.status(200).json()
})

router.get('/get-list-photo', async (req, res) => {
    const user = await User.findById(req.query.id);
    user.populated('photos');
    await user.populate('photos').execPopulate();

    return res.status(200).json(user.photos)
})

module.exports = router;
