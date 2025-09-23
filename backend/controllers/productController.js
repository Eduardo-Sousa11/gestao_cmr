const Product = require("../models/Product")

// Criar novo produto vinculado ao usuário logado
exports.createProduct = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      owner: req.user.id
    })
    await product.save()
    res.status(201).json(product)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Listar apenas produtos do usuário logado
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ owner: req.user.id })
    res.status(200).json(products)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Buscar produto por ID (apenas se for do usuário)
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, owner: req.user.id })
    if (!product) return res.status(404).json({ message: "Produto não encontrado ou sem permissão" })
    res.status(200).json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Atualizar produto (apenas se for do usuário)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true, runValidators: true }
    )
    if (!product) return res.status(404).json({ message: "Produto não encontrado ou sem permissão" })
    res.status(200).json(product)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Deletar produto (apenas se for do usuário)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, owner: req.user.id })
    if (!product) return res.status(404).json({ message: "Produto não encontrado ou sem permissão" })
    res.status(200).json({ message: "Produto removido com sucesso" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
