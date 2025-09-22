const mongoose = require('mongoose');

const orderLaunchSchema = new mongoose.Schema(
  {
    pedido: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order', // referência ao pedido
      required: true
    },
    produto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // referência ao produto
      required: true
    },
    quantidade: {
      type: Number,
      required: true,
      min: 1
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('OrderLaunch', orderLaunchSchema);
