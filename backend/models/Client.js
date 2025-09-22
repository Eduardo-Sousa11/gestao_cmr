// models/Client.js
const mongoose = require("mongoose")

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  telefone: {
    type: String,
    required: false,
    trim: true,
  },
  empresa: {
    type: String, // pode ser só o nome da empresa ou referência ao model Company
    required: true,
  }
}, {
  timestamps: true // cria createdAt e updatedAt automáticos
})

module.exports = mongoose.model("Client", ClientSchema)
