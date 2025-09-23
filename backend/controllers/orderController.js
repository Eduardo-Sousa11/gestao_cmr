const Order = require('../models/Order')

// Criar novo pedido vinculado ao usuário logado
exports.createOrder = async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      owner: req.user.id
    })
    await order.save();
    res.status(201).json(order)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Listar apenas os pedidos do usuário logado
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ owner: req.user.id }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Buscar pedido por ID (apenas se for do usuário)
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, owner: req.user.id })
    if (!order) return res.status(404).json({ error: 'Pedido não encontrado ou sem permissão' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Atualizar pedido (apenas se for do usuário)
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true, runValidators: true }
    )
    if (!order) return res.status(404).json({ error: 'Pedido não encontrado ou sem permissão' })
    res.json(order)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Deletar pedido (apenas se for do usuário)
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ _id: req.params.id, owner: req.user.id })
    if (!order) return res.status(404).json({ error: 'Pedido não encontrado ou sem permissão' })
    res.json({ message: 'Pedido excluído com sucesso' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
