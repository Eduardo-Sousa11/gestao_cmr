const OrderLaunch = require('../models/OrderLaunch')

// Criar lançamento de pedido
exports.createOrderLaunch = async (req, res) => {
  try {
    const orderLaunch = new OrderLaunch(req.body)
    await orderLaunch.save()
    res.status(201).json(orderLaunch)
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Listar todos os lançamentos
exports.getOrdersLaunch = async (req, res) => {
  try {
    const ordersLaunch = await OrderLaunch.find()
      .sort({ createdAt: -1 })
    res.json(ordersLaunch)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Buscar lançamento por ID
exports.getOrderLaunchById = async (req, res) => {
  try {
    const orderLaunch = await OrderLaunch.findById(req.params.id)
    if (!orderLaunch) return res.status(404).json({ error: 'Lançamento não encontrado' })
    res.json(orderLaunch)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Atualizar lançamento
exports.updateOrderLaunch = async (req, res) => {
  try {
    const orderLaunch = await OrderLaunch.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!orderLaunch) return res.status(404).json({ error: 'Lançamento não encontrado' })
    res.json(orderLaunch)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Deletar lançamento
exports.deleteOrderLaunch = async (req, res) => {
  try {
    const orderLaunch = await OrderLaunch.findByIdAndDelete(req.params.id)
    if (!orderLaunch) return res.status(404).json({ error: 'Lançamento não encontrado' })
    res.json({ message: 'Lançamento excluído com sucesso' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
