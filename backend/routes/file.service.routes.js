const { Router } = require('express');

const storage = require('../firebase/firebaseResource')

const router = new Router()

router.get('/user-avatar',  async (req, res) => {


    res.status(200).json({message: req.query.id, messageType: 'success'})
})





module.exports = router;