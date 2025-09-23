const User = require('../models/User')

// Registrar usuário
exports.registerUser = async (req, res) => {
    try {
        const { name, email, senha } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: 'Email já cadastrado' })

        const user = await User.create({ name, email, senha })

        res.status(201).json({
            message: 'Usuário criado com sucesso',
            user: { id: user._id, name: user.name, email: user.email },
            token: user.generateToken()
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao criar usuário' })
    }
}

// Login
exports.loginUser = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: 'Email ou senha incorretos' })

        const isMatch = await user.matchPassword(senha)
        if (!isMatch) return res.status(400).json({ message: 'Email ou senha incorretos' })

        res.json({
            message: 'Login realizado com sucesso',
            user: { id: user._id, name: user.name, email: user.email },
            token: user.generateToken()
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao realizar login' })
    }
}

// Buscar dados do próprio usuário logado
exports.getMe = async (req, res) => {
    try {
        res.json({
            id: req.user._id,
            name: req.user.name,
            email: req.user.email
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao buscar dados do usuário' })
    }
}

// Atualizar dados do próprio usuário
exports.updateMe = async (req, res) => {
    try {
        const { name, email, senha } = req.body

        const user = await User.findById(req.user._id)
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' })

        if (name) user.name = name
        if (email) user.email = email
        if (senha) user.senha = senha

        await user.save()

        res.json({
            id: user._id,
            name: user.name,
            email: user.email
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao atualizar usuário' })
    }
}

// Deletar o próprio usuário
exports.deleteMe = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user._id)
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' })

        res.json({ message: 'Conta excluída com sucesso' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao excluir usuário' })
    }
}
