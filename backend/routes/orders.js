// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Rotas CRUD
router.post('/', orderController.createOrder);       // Criar pedido
router.get('/', orderController.getOrders);          // Listar pedidos
router.get('/:id', orderController.getOrderById);    // Buscar pedido por ID
router.put('/:id', orderController.updateOrder);     // Atualizar pedido
router.delete('/:id', orderController.deleteOrder);  // Deletar pedido

module.exports = router;
