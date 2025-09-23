const Company = require('../models/Company')

// Listar todas as empresas do usuário logado
exports.getAllCompanies = async (req, res) => {
  try {
    // req.user.id vem do authMiddleware
    const companies = await Company.find({ owner: req.user.id })
    res.json(companies)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erro ao buscar empresas' })
  }
}

// Buscar empresa pelo ID (somente se for do usuário)
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findOne({ _id: req.params.id, owner: req.user.id })
    if (!company) return res.status(404).json({ message: 'Empresa não encontrada ou sem permissão' })
    res.json(company)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erro ao buscar empresa' })
  }
}

// Criar nova empresa vinculada ao usuário logado
exports.createCompany = async (req, res) => {
  try {
    const { name, razaoSocial, cnpj } = req.body
    if (!name || !razaoSocial || !cnpj) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
    }

    const newCompany = new Company({
      name,
      razaoSocial,
      cnpj,
      owner: req.user.id // vincula empresa ao usuário
    })
    await newCompany.save()
    res.status(201).json(newCompany)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erro ao criar empresa' })
  }
}

// Atualizar empresa (só se for do usuário)
exports.updateCompany = async (req, res) => {
  try {
    const { name, razaoSocial, cnpj } = req.body
    const company = await Company.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { name, razaoSocial, cnpj },
      { new: true }
    )
    if (!company) return res.status(404).json({ message: 'Empresa não encontrada ou sem permissão' })
    res.json(company)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erro ao atualizar empresa' })
  }
}

// Deletar empresa (só se for do usuário)
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findOneAndDelete({ _id: req.params.id, owner: req.user.id })
    if (!company) return res.status(404).json({ message: 'Empresa não encontrada ou sem permissão' })
    res.json({ message: 'Empresa excluída com sucesso' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erro ao excluir empresa' })
  }
}
