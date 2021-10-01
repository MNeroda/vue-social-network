const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Conversation = require('../models/Conversation');
const config = require('config');

function decryptJWT(socket) {
    return jwt.verify(socket.handshake.auth.token, config.get('jwtSecret'));
}

const createWebsocket = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: 'http://localhost:8080',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', async (socket) => {
        console.log('connect');
        const { userId } = decryptJWT(socket);

        if (!userId) {
            console.log('Нет авторизации');
        }

        //подключение к комнатам и запись в бд socket id
        //использую IIFE чтобы не загрязнять глобальную для сокетов область видимости
        await (async function () {
            const user = await User.findById(userId);
            user.conversationList.map((conversationId) => {
                socket.join(conversationId.toString());
            });
            user.socketId = socket.id;
            await user.save();
        })();

        socket.on('FIND_FRIENDS_BY_NAME', async (search) => {
            const jsonArr = [];
            await User.find(
                { name: { $regex: search, $options: 'ig' } },
                (err, doc) => {
                    doc.map((item) => {
                        if (item._id.toString() !== userId) {
                            jsonArr.push({
                                id: item._id,
                                email: item.email,
                                name: item.name,
                                isHaveAvatar: item.isHaveAvatar,
                            });
                        }
                    });
                }
            ).exec();
            io.emit('SET_FRIENDS_BY_NAME', jsonArr);
        });

        socket.on('SEND_MESSAGE_IN_NEW_DIALOG', async ({ message, toId }) => {
            console.log('SEND_MESSAGE_IN_NEW_DIALOG');

            if (!toId || !userId) {
                throw new Error('Создание диалога без пользователя');
            }

            const newMessage = {
                value: message,
                senderId: userId,
                date: Date.now(),
            };
            const conversation = new Conversation({
                members: [userId, toId],
                messages: [newMessage],
                lastMessage: newMessage,
                isGroup: false,
            });
            await conversation.save();

            const conversationId = conversation._id.toString();
            const fromUser = await User.findById(userId);
            fromUser.populated('conversationList');
            await fromUser.populate('conversationList').execPopulate();

            fromUser.conversationList.push(conversationId);
            await fromUser.save();

            const toUser = await User.findById(toId);
            toUser.conversationList.push(conversationId);
            await toUser.save();

            socket.join(conversationId);

            if (toUser.socketId) {
                io.to(toId).join(conversationId);
            }

            io.to(conversationId).emit('NEW_DIALOG', conversation);
        });

        socket.on('SEND_MESSAGE_IN_EXIST_DIALOG', async ({ message, toId }) => {
            console.log('SEND_MESSAGE_IN_EXIST_DIALOG');
            if (!toId || !userId) {
                throw new Error(
                    'Отправка сообщения несуществующему пользователю'
                );
            }

            const newMessage = {
                value: message,
                senderId: userId,
                date: Date.now(),
            };

            const conversation = await Conversation.findById(toId);
            conversation.messages.push(newMessage);
            await conversation.save();

            io.to(toId).emit('NEW_MESSAGE', {
                toId,
                ...newMessage,
            });
        });

        socket.on('ADD_TO_FRIENDS', async (toId) => {
            const user = await User.findById(userId);
            const anotherUser = await User.findById(toId);

            //Если оба пользователя добавили друг друга в друзья
            const indexUser = user.requestFriendsList.indexOf(toId);
            const indexAnotherUser =
                anotherUser.requestFriendsList.indexOf(userId);

            if (user.friendsList.includes(toId)) {
                io.emit('MESSAGE', {
                    message: `${anotherUser.name} уже ваш друг`,
                    messageType: 'warning',
                });
            } else if (indexAnotherUser > -1) {
                io.emit('MESSAGE', {
                    message: `Пользователь ${anotherUser.name} уже получил запрос на добавление в друзья`,
                    messageType: 'warning',
                });
            } else if (indexUser > -1) {
                user.requestFriendsList.splice(indexUser, 1);
                user.friendsList.push(toId);
                anotherUser.requestFriendsList.splice(indexAnotherUser, 1);
                anotherUser.friendsList.push(userId);

                await user.save();
                await anotherUser.save();

                if (anotherUser.socketId) {
                    io.to(anotherUser.socketId).emit('MESSAGE', {
                        message: `Пользователь ${user.name} добавлен в ваш список друзей`,
                        messageType: 'success',
                    });
                    io.to(anotherUser.socketId).emit(
                        'NEW_FRIEND_PUSH_TO_STORE',
                        {
                            id: user._id,
                            name: user.name,
                            isHaveAvatar: user.isHaveAvatar,
                        }
                    );
                }
                io.emit('MESSAGE', {
                    message: `Пользователь ${anotherUser.name} добавлен в ваш список друзей`,
                    messageType: 'success',
                });
                io.emit('NEW_FRIEND_PUSH_TO_STORE', {
                    id: anotherUser._id,
                    name: anotherUser.name,
                    isHaveAvatar: anotherUser.isHaveAvatar,
                });
            } else {
                anotherUser.requestFriendsList.push(userId);
                await anotherUser.save();

                if (anotherUser.socketId) {
                    io.to(anotherUser.socketId).emit('MESSAGE', {
                        message: `Пользователь ${user.name} хочет добавить вас в список друзей`,
                        messageType: 'info',
                    });
                }

                io.emit('MESSAGE', {
                    message: `Вы предложили дружбу ${anotherUser.name}`,
                    messageType: 'info',
                });
            }
        });

        socket.on('disconnect', async () => {
            await User.findOneAndUpdate(
                { _id: userId },
                { $set: { socketId: null } },
                { useFindAndModify: false }
            );
        });
    });
};

module.exports = createWebsocket;
