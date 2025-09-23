const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  valor: {
    type: Number, // melhor salvar como número em vez de string
    required: true
  },
  descricao: {
    type: String,
    required: false,
    trim: true
  },
  empresa: {
    type: String, // pode ser só o nome da empresa
    required: true
  }
}, {
  timestamps: true // cria createdAt e updatedAt automáticos
})

module.exports = mongoose.model("Product", ProductSchema)

