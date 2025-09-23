const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  razaoSocial: { type: String, required: true },
  cnpj: { type: String, required: true, unique: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

module.exports = mongoose.model('Company', companySchema)
