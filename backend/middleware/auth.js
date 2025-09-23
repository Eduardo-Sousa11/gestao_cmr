const jwt = require("jsonwebtoken")
const User = require("../models/User")

exports.authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "")
    if (!token) {
        return res.status(401).json({ message: "Acesso negado, token não encontrado" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select("-senha")
        if (!req.user) {
            return res.status(404).json({ message: "Usuário não encontrado" })
        }
        next()
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "Token inválido" })
    }
}
