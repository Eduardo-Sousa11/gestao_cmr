const Company = require('../models/Company')

// Listar todas as empresas
exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find()
        res.json(companies)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao buscar empresas' })
    }
}

// Buscar empresa pelo ID
exports.getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id)
        if (!company) return res.status(404).json({ message: 'Empresa não encontrada' })
        res.json(company)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao buscar empresa' })
    }
}

// Criar nova empresa
exports.createCompany = async (req, res) => {
    try {
        const { name, razaoSocial, cnpj } = req.body

        if (!name || !razaoSocial || !cnpj) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
        }

        const newCompany = new Company({ name, razaoSocial, cnpj })
        await newCompany.save()
        res.status(201).json(newCompany)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao criar empresa' })
    }
}

// Atualizar empresa
exports.updateCompany = async (req, res) => {
    try {
        const { name, razaoSocial, cnpj } = req.body
        const company = await Company.findByIdAndUpdate(
            req.params.id,
            { name, razaoSocial, cnpj },
            { new: true }
        )
        if (!company) return res.status(404).json({ message: 'Empresa não encontrada' })
        res.json(company)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao atualizar empresa' })
    }
}

// Deletar empresa
exports.deleteCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id)
        if (!company) return res.status(404).json({ message: 'Empresa não encontrada' })
        res.json({ message: 'Empresa excluída com sucesso' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao excluir empresa' })
    }
}
