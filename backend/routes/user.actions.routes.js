const {Router} = require('express')
const User = require('../models/User');

const router = new Router()

router.get('/user-info', async (req, res) => {
    const user = await User.findById(req.query.id)
    return res.status(200).json({phone: user.phone, email: user.email, name: user.name})
})




module.exports = router;