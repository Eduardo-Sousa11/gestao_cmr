const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true }
})

// Hash da senha antes de salvar
userSchema.pre("save", async function (next) {
    if (!this.isModified("senha")) return next()
    this.senha = await bcrypt.hash(this.senha, 10)
    next()
})

// Comparar senha
userSchema.methods.matchPassword = function (senhaDigitada) {
    return bcrypt.compare(senhaDigitada, this.senha)
}

// Gerar token
userSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}

module.exports = mongoose.model("User", userSchema)
