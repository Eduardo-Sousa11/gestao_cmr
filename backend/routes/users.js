const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { authMiddleware } = require('../middleware/auth')

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)

router.get('/me', authMiddleware, userController.getMe)      
router.put('/me', authMiddleware, userController.updateMe) 
router.delete('/me', authMiddleware, userController.deleteMe)

module.exports = router
