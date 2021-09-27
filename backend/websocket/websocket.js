const jwt = require('jsonwebtoken');
const User = require('../models/User');
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

        socket.on('TEST_FROM_FRONT', async () => {
            io.emit('TEST_FROM_BACK', socket.handshake.auth.token);
        });

        socket.on('FIND_FRIENDS_BY_NAME', async (search) => {
            const { userId } = decryptJWT(socket);

            const jsonArr = [];
            await User.find(
                { name: { $regex: search, $options: 'i' } },
                (err, doc) => {
                    doc.map((item) => {
                        if (item._id !== userId) {
                            jsonArr.push({
                                id: item._id,
                                email: item.email,
                                name: item.name,
                                isHaveAvatar: item.isHaveAvatar,
                            });
                        }
                    });
                }
            );
            io.emit('SET_FRIENDS_BY_NAME', jsonArr);
        });

        socket.on('disconnect', async () => {
            console.log('disconnect');
        });
    });
};

module.exports = createWebsocket;
