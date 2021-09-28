const { Router } = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth.middleware.js');

const router = new Router();

router.get('/user-info', async (req, res) => {
    const user = await User.findById(req.query.id);
    return res.status(200).json({
        phone: user.phone,
        email: user.email,
        name: user.name,
        isHaveAvatar: user.isHaveAvatar,
    });
});

router.get('/conversations', authMiddleware, async (req, res) => {
    const user = await User.findById(req.userId);
    user.populated("conversationList")
    await user.populate("conversationList")
        .execPopulate()

    const data = user.conversationList.map(dialog => dialog.members.filter(item => item.toString() !== req.userId)[0])

    return res.status(200).json({ conversationArr: data });
});

module.exports = router;
