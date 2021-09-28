const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Conversation = require('../models/Conversation');
const config = require('config');
const { log } = require('nodemon/lib/utils');

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

    io.on('connection', (socket) => {
        console.log('connect');
        const { userId } = decryptJWT(socket);

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
                lastMessage: newMessage
            });
            await conversation.save()

            const fromUser = await User.findById(userId)
            fromUser.populated("conversationList")
            await fromUser.populate("conversationList")
                .execPopulate()


            fromUser.conversationList.push(conversation._id)

            await fromUser.save()

            //Todo сделать отправку другому пользователю io.to(toUser.socketId).emit
        });

        socket.on('SEND_MESSAGE_IN_EXIST_DIALOG', async ({ message, toId }) => {
            if (!toId || !userId) {
                throw new Error('Отправка сообщения несуществующему пользователю')
            }

            const newMessage = {
                value: message,
                senderId: userId,
                date: Date.now()
            }


            //Такой способ через populated не прокатил, надо будет обновлять диалоги через модель conversation
            const fromUser = await User.findById(userId)
            fromUser.populated("conversationList")
            await fromUser.populate("conversationList")
                .execPopulate()

            const indexConversation = fromUser.conversationList.findIndex(dialog => dialog.members.map(item => item.toString()).includes(toId))
            fromUser.conversationList[indexConversation].lastMessage = newMessage
            fromUser.conversationList[indexConversation].messages.push(newMessage)
            await fromUser.save()

        })



        socket.on('disconnect', async () => {
            console.log('disconnect');
        });
    });
};

module.exports = createWebsocket;
