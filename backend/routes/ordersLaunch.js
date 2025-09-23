const express = require('express')
const router = express.Router()
const orderLaunchController = require('../controllers/orderLaunchController')
const { authMiddleware } = require('../middleware/auth')

router.post('/', authMiddleware, orderLaunchController.createOrderLaunch)
router.get('/', authMiddleware, orderLaunchController.getOrdersLaunch)
router.get('/:id', authMiddleware, orderLaunchController.getOrderLaunchById)
router.put('/:id', authMiddleware, orderLaunchController.updateOrderLaunch)
router.delete('/:id', authMiddleware, orderLaunchController.deleteOrderLaunch)

module.exports = router
