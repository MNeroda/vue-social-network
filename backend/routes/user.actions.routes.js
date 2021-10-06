const { Router } = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth.middleware.js');

const router = new Router();

router.get('/friends-list', async (req, res) => {
    const user = await User.findById(req.query.id);
    user.populated('friendsList');
    await user.populate('friendsList').execPopulate();
    const data = user.friendsList.map((user) => ({
        id: user._id,
        name: user.name,
        isHaveAvatar: user.isHaveAvatar,
    }));
    return res.status(200).json(data);
});

router.get('/friends-request', authMiddleware, async (req, res) => {
    const user = await User.findById(req.userId);
    user.populated('requestFriendsList');
    await user.populate('requestFriendsList').execPopulate();

    return res.status(200).json(
        user.requestFriendsList.map((user) => ({
            id: user._id,
            name: user.name,
            isHaveAvatar: user.isHaveAvatar,
        }))
    );
});

router.get('/user-info', async (req, res) => {
    try {
        const user = await User.findById(req.query.id);
        return res.status(200).json({
            phone: user.phone,
            email: user.email,
            name: user.name,
            isHaveAvatar: user.isHaveAvatar,
            id: user._id,
        });
    } catch (e) {
        return res.status(200).json();
    }
});

router.get('/conversations', authMiddleware, async (req, res) => {
    const user = await User.findById(req.userId);
    user.populated('conversationList');
    await user.populate('conversationList').execPopulate();

    const data = user.conversationList.map((dialog) => ({
        groupName: dialog.groupName,
        members: dialog.members.filter(
            (item) => item.toString() !== req.userId
        ),
        id: dialog._id,
    }));

    const arrIds = data
        .map((item) => item.members)
        .reduce((acc, item) => {
            item.map((id) => acc.push(id));
            return acc;
        }, []);
    const users = await User.find({
        _id: { $in: arrIds },
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
    const currentConversation = user.conversationList.filter(
        (conversation) => conversation._id.toString() === req.query.id
    );
    if (currentConversation.length) {
        const messages = currentConversation.map((conversation) =>
            conversation.messages.map((mes) => ({
                date: mes.date,
                senderId: mes.senderId,
                value: mes.value,
                toId: mes._id,
            }))
        )[0];
        return res.status(200).json({ messages });
    }
    return res.status(404).json({});
});

module.exports = router;
