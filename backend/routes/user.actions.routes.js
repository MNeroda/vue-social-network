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

    const users = await User.find({
        _id: { $in: data.map((item) => item.members) },
    });
    const conversationsData = data.map((dialog) => ({
        ...dialog,
        members: dialog.members.map((member) => {
            const index = users.findIndex(
                (user) => user._id.toString() === member.toString()
            );
            return {
                id: member,
                name: users[index].name,
                isHaveAvatar: users[index].isHaveAvatar,
            };
        }),
    }));

    return res.status(200).json({ conversationArr: conversationsData });
});

router.get('/messages-by-id', authMiddleware, async (req, res) => {
    const user = await User.findById(req.userId);

    user.populated('conversationList');
    await user.populate('conversationList').execPopulate();
    const currentConversation = user.conversationList.filter(conversation => conversation._id.toString() === req.query.id)
    if (currentConversation.length) {
        const messages = currentConversation.map(conversation => conversation.messages)[0]
        return res.status(200).json({messages})
    }
    return res.status(404).json({})
});

module.exports = router;
