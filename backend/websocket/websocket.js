const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');

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
            console.log(socket.handshake.auth.token);
            io.emit('TEST_FROM_BACK', socket.handshake.auth.token);
        });

        socket.on('disconnect', async () => {
            console.log('disconnect');
        });
    });
};

module.exports = createWebsocket;
