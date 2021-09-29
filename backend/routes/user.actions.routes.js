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
    user.populated('conversationList');
    await user.populate('conversationList').execPopulate();

    const data = user.conversationList.map((dialog) => ({
        members: dialog.members.filter(
            (item) => item.toString() !== req.userId
        ),
        id: dialog._id,
    }));

    const users = await User.find({_id: {"$in": data.map(item => item.members)}})
    const conversationsData = data.map(dialog => ({
        ...dialog,
        members: dialog.members.map(member => {
            const index = users.findIndex(user => user._id.toString() === member.toString())
            return {
                id: member,
                name: users[index].name,
                isHaveAvatar: users[index].isHaveAvatar
            }
        })
    }))

    return res.status(200).json({ conversationArr: conversationsData });
});

module.exports = router;
