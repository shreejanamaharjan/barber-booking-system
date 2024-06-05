const express = require('express')
const { loginController, registerController } = require('../controllers/userController')

// router 
const router = express.Router()

// route
// login| post
router.post('/login', loginController)

// register|post
router.post('/register', registerController)
module.exports = router