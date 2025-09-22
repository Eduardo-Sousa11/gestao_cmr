const express = require('express');
const router = express.Router();
const orderLaunchController = require('../controllers/orderLaunchController');

// Rotas CRUD
router.post('/', orderLaunchController.createOrderLaunch);       // Criar lançamento
router.get('/', orderLaunchController.getOrdersLaunch);          // Listar todos
router.get('/:id', orderLaunchController.getOrderLaunchById);    // Buscar por ID
router.put('/:id', orderLaunchController.updateOrderLaunch);     // Atualizar
router.delete('/:id', orderLaunchController.deleteOrderLaunch);  // Deletar

module.exports = router;
