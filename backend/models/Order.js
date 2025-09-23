// models/Order.js
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // nome do pedido
  },
  numero: {
    type: String,
    required: true, // número do pedido
    unique: true,   // cada número deve ser único
  },
  cliente: {
    type: String,
    required: true, // nome do cliente
  },
  empresa: {
    type: String,
    required: true, // nome da empresa
  },
  observacao: {
    type: String,
    default: '',    // observação opcional
  },
  data: {
    type: Date,
    required: true, // data do pedido
    default: Date.now,
  },
}, {
  timestamps: true // cria createdAt e updatedAt automaticamente
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order

