const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  valor: {
    type: Number,
    required: true
  },
  descricao: {
    type: String,
    required: false,
    trim: true
  },
  empresa: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("Product", ProductSchema)
