const { Router } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = new Router();

router.get('/test', async (req, res) => {
    try {
        return res.status(200).json({ message: 'hello' });
    } catch (e) {
        console.log('error');
        res.status(500).json({ message: 'server error' });
    }
});

module.exports = router;
