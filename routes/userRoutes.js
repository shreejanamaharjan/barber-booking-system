const express = require('express')
const { loginController, registerController, authController } = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

// router 
const router = express.Router()

// route
// login| post
router.post('/login', loginController)

// register|post
router.post('/register', registerController)

//auth|post
router.post('getUserData',authMiddleware, authController)
module.exports = router