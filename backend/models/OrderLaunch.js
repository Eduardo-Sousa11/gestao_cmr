const mongoose = require('mongoose')

const orderLaunchSchema = new mongoose.Schema(
  {
    pedido: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },
    produto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantidade: {
      type: Number,
      required: true,
      min: 1
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('OrderLaunch', orderLaunchSchema)
