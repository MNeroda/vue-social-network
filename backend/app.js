const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/user', require('./routes/user.actions.routes'));
app.use('/api/file', require('./routes/file.routes'));

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('MongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        app.listen(5000, () => {
            console.log(`App has been started on port ${PORT}...`);
        });
    } catch (e) {
        console.log(`Server error ${e.message}`);
        process.exit(1);
    }
}

start();

const http = require('http');
const server = http.createServer(app);

const io = require('./websocket/websocket');
io(server);

server.listen(8999, () => {
    console.log('websocket server has been started on port ', 8999);
});
