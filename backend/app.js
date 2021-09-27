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
        const server = app.listen(5000, () => {
            console.log(`App has been started on port ${PORT}...`);
        });

        const io = require('./websocket/websocket');
        io(server);
    } catch (e) {
        console.log(`Server error ${e.message}`);
        process.exit(1);
    }
}

start();
