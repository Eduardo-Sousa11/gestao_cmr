const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // nome do pedido
  },
  numero: {
    type: String,
    required: true,
    unique: true,
  },
  cliente: {
    type: String,
    required: true,
  },
  empresa: {
    type: String,
    required: true,
  },
  observacao: {
    type: String,
    default: '',
  },
  data: {
    type: Date,
    required: true,
    default: Date.now,
  },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)
