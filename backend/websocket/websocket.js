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
        await (async function() {
            const user = await User.findById(userId)
            user.conversationList.map(conversationId => {
                socket.join(conversationId.toString())
            })
            user.socketId = socket.id
            await user.save()
        })()

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
                throw new Error('Создание диалога без пользователя')
            }

            const newMessage = {
                value: message,
                senderId: userId,
                date: Date.now()
            }
            const conversation = new Conversation({
                members: [userId, toId],
                messages: [newMessage],
                lastMessage: newMessage,
                isGroup: false
            });
            await conversation.save()

            const conversationId = conversation._id.toString()
            const fromUser = await User.findById(userId)
            fromUser.populated("conversationList")
            await fromUser.populate("conversationList")
                .execPopulate()

            fromUser.conversationList.push(conversationId)
            await fromUser.save()

            const toUser = await User.findById(toId)
            toUser.conversationList.push(conversationId)
            await toUser.save()

            socket.join(conversationId)

            if(toUser.socketId) {
                io.to(toId).join(conversationId)
            }

            io.to(conversationId).emit('NEW_DIALOG', conversation)
        });


        socket.on('SEND_MESSAGE_IN_EXIST_DIALOG', async ({ message, toId }) => {
            console.log('SEND_MESSAGE_IN_EXIST_DIALOG');
            if (!toId || !userId) {
                throw new Error('Отправка сообщения несуществующему пользователю')
            }

            const newMessage = {
                value: message,
                senderId: userId,
                date: Date.now()
            }

            const conversation = await Conversation.findById(toId)
            conversation.messages.push(newMessage)
            await conversation.save()

            io.to(toId).emit('NEW_MESSAGE', {
                toId,
                ...newMessage
            })

        })

        socket.on('disconnect', async () => {
            await User.findOneAndUpdate({_id: userId}, {$set: {socketId: null}}, {useFindAndModify: false})
        });
    });
};

module.exports = createWebsocket;
