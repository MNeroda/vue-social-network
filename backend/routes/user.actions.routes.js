const { Router } = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth.middleware.js');

const router = new Router();

router.get('/user-info', async (req, res) => {
    const user = await User.findById(req.query.id);
    return res
        .status(200)
        .json({
            phone: user.phone,
            email: user.email,
            name: user.name,
            isHaveAvatar: user.isHaveAvatar,
        });
});

router.get('/get-conversations', authMiddleware, async (req, res) => {
    const user = await User.findById(req.userId);

    if (user.conversationList.length) {
        return res.status(200).json({ res: [] });
    }

    return res.status(200).json({ res: [] });
});

module.exports = router;
