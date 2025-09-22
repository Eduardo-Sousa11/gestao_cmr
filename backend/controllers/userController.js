const User = require('../models/User');

exports.registerUser = async (req, res) => {
    try {
        const { name, email, senha } = req.body;

        // Verifica se já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email já cadastrado' });

        const user = await User.create({ name, email, senha });

        res.status(201).json({
            message: 'Usuário criado com sucesso',
            user: { id: user._id, name: user.name, email: user.email },
            token: user.generateToken()
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar usuário' });
    }
};


exports.loginUser = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Email ou senha incorretos' });

        const isMatch = await user.matchPassword(senha);
        if (!isMatch) return res.status(400).json({ message: 'Email ou senha incorretos' });

        res.json({
            message: 'Login realizado com sucesso',
            user: { id: user._id, name: user.name, email: user.email },
            token: user.generateToken()
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao realizar login' });
    }
};


exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        const formattedUsers = users.map(u => ({
            id: u._id,
            name: u.name,
            email: u.email,
            senha: u.senha
        }));
        res.json(formattedUsers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
};


exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        const formattedUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            senha: user.senha
        };
        res.json(formattedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, senha } = req.body;

        // Verifica se já existe usuário com este email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email já cadastrado' });
        }

        // Cria usuário (o pre-save hook fará o hash da senha)
        const newUser = new User({
            name,
            email,
            senha
        });

        await newUser.save();

        // Retorna sem a senha
        res.status(201).json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        });

    } catch (err) {
        console.error("Erro ao criar usuário:", err);
        res.status(500).json({ message: 'Erro ao criar usuário' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, email, senha } = req.body;
        
        // Busca o usuário primeiro
        const existingUser = await User.findById(req.params.id);
        if (!existingUser) return res.status(404).json({ message: 'Usuário não encontrado' });

        // Atualiza os campos
        existingUser.name = name;
        existingUser.email = email;
        
        // Se uma nova senha foi fornecida, atualiza ela (o pre-save hook fará o hash)
        if (senha) {
            existingUser.senha = senha;
        }
        
        // Salva o usuário (o pre-save hook aplicará o hash na senha se necessário)
        await existingUser.save();

        const formattedUser = {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            senha: existingUser.senha
        };
        res.json(formattedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json({ message: 'Usuário excluído com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao excluir usuário' });
    }
};
