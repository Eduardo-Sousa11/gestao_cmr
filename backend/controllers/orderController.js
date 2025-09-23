// controllers/orderController.js
const Order = require('../models/Order')

// Criar novo pedido
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body)
    await order.save();
    res.status(201).json(order)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Listar todos os pedidos
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Buscar pedido por ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ error: 'Pedido não encontrado' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Atualizar pedido
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!order) return res.status(404).json({ error: 'Pedido não encontrado' })
    res.json(order)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Deletar pedido
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (!order) return res.status(404).json({ error: 'Pedido não encontrado' })
    res.json({ message: 'Pedido excluído com sucesso' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
