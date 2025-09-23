const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { authMiddleware } = require('../middleware/auth')

// Rotas públicas
router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)

// Rotas privadas (precisam do token JWT)
router.get('/me', authMiddleware, userController.getMe)      
router.put('/me', authMiddleware, userController.updateMe) 
router.delete('/me', authMiddleware, userController.deleteMe)
module.exports = router
