const mongoose = require("mongoose")

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  telefone: {
    type: String,
    required: false,
    trim: true
  },
  empresa: {
    type: String, // ou referência a Company
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("Client", ClientSchema)
