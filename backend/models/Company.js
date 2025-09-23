const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    razaoSocial: { type: String, required: true },
    cnpj: { type: String, required: true, unique: true, match: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/ }
}, { timestamps: true })

module.exports = mongoose.model('Company', companySchema)
