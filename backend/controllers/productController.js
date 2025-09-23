const Product = require("../models/Product")

// Criar novo produto
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json(product)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Listar todos os produtos
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Buscar produto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" })
    }
    res.status(200).json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Atualizar produto
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" })
    }
    res.status(200).json(product)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Deletar produto
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" })
    }
    res.status(200).json({ message: "Produto removido com sucesso" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
