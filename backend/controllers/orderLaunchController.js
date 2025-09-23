const OrderLaunch = require('../models/OrderLaunch')

// Criar lançamento vinculado ao usuário logado
exports.createOrderLaunch = async (req, res) => {
  try {
    const orderLaunch = new OrderLaunch({
      ...req.body,
      owner: req.user.id
    })
    await orderLaunch.save()
    res.status(201).json(orderLaunch)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Listar apenas lançamentos do usuário logado
exports.getOrdersLaunch = async (req, res) => {
  try {
    const ordersLaunch = await OrderLaunch.find({ owner: req.user.id })
      .sort({ createdAt: -1 })
    res.json(ordersLaunch)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Buscar lançamento por ID (apenas se for do usuário)
exports.getOrderLaunchById = async (req, res) => {
  try {
    const orderLaunch = await OrderLaunch.findOne({ _id: req.params.id, owner: req.user.id })
    if (!orderLaunch) return res.status(404).json({ error: 'Lançamento não encontrado ou sem permissão' })
    res.json(orderLaunch)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Atualizar lançamento (apenas se for do usuário)
exports.updateOrderLaunch = async (req, res) => {
  try {
    const orderLaunch = await OrderLaunch.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true, runValidators: true }
    )
    if (!orderLaunch) return res.status(404).json({ error: 'Lançamento não encontrado ou sem permissão' })
    res.json(orderLaunch)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Deletar lançamento (apenas se for do usuário)
exports.deleteOrderLaunch = async (req, res) => {
  try {
    const orderLaunch = await OrderLaunch.findOneAndDelete({ _id: req.params.id, owner: req.user.id })
    if (!orderLaunch) return res.status(404).json({ error: 'Lançamento não encontrado ou sem permissão' })
    res.json({ message: 'Lançamento excluído com sucesso' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
