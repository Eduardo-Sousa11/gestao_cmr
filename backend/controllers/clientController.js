const Client = require("../models/Client")

// Criar novo cliente vinculado ao usuário logado
exports.createClient = async (req, res) => {
  try {
    const client = new Client({
      ...req.body,
      owner: req.user.id
    })
    await client.save()
    res.status(201).json(client)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Listar todos os clientes do usuário logado
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find({ owner: req.user.id })
    res.status(200).json(clients)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Buscar cliente por ID (somente se for do usuário)
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findOne({ _id: req.params.id, owner: req.user.id })
    if (!client) return res.status(404).json({ message: "Cliente não encontrado ou sem permissão" })
    res.status(200).json(client)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Atualizar cliente (somente se for do usuário)
exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true, runValidators: true }
    )
    if (!client) return res.status(404).json({ message: "Cliente não encontrado ou sem permissão" })
    res.status(200).json(client)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Deletar cliente (somente se for do usuário)
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findOneAndDelete({ _id: req.params.id, owner: req.user.id })
    if (!client) return res.status(404).json({ message: "Cliente não encontrado ou sem permissão" })
    res.status(200).json({ message: "Cliente removido com sucesso" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
