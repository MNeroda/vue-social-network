const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')

const app = express();
app.use(cookieParser())
app.use(express.json({ extended: true }));

const firebase = require('./firebase/firebaseResource')

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/file-service', require('./routes/file.service.routes'))

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
