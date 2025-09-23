import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import '../../styles.css'
import CompaniesForm from './CompanieForm'
import CompaniesEdit from './CompanieEdit'
import api from "../../services/api"

function CompaniesList() {
    const [companies, setCompanies] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingCompany, setEditingCompany] = useState(null)

    const getToken = () => localStorage.getItem("token")

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const token = getToken()
                if (!token) return
                const response = await api.get('/companies', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setCompanies(response.data)
            } catch (error) {
                console.error('Erro ao buscar empresas:', error)
                alert('Erro ao buscar empresas do servidor')
            }
        }
        fetchCompanies()
    }, [])

    const handleEdit = (company) => setEditingCompany(company)

    const handleUpdateCompany = async (updatedCompany) => {
        try {
            const token = getToken()
            const response = await api.put(`/companies/${updatedCompany._id}`, updatedCompany, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setCompanies(companies.map(c => c._id === updatedCompany._id ? response.data : c))
            setEditingCompany(null)
            alert('Empresa atualizada com sucesso!')
        } catch (error) {
            console.error('Erro ao atualizar empresa:', error)
            alert('Erro ao atualizar empresa')
        }
    }

    const handleDelete = async (companyId) => {
        if (window.confirm('Deseja realmente excluir esta empresa?')) {
            try {
                const token = getToken()
                await api.delete(`/companies/${companyId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setCompanies(companies.filter(c => c._id !== companyId))
                alert('Empresa excluída com sucesso!')
            } catch (error) {
                console.error('Erro ao excluir empresa:', error)
                alert('Erro ao excluir empresa')
            }
        }
    }

    const handleAddCompany = () => setIsModalOpen(true)

    const handleSaveCompany = async (newCompany) => {
        try {
            const token = getToken()
            const response = await api.post('/companies', newCompany, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setCompanies([...companies, response.data])
            setIsModalOpen(false)
            alert('Empresa criada com sucesso!')
        } catch (error) {
            console.error('Erro ao criar empresa:', error)
            alert('Erro ao criar empresa')
        }
    }

    return (
        <div className="companies-container">
            <div className="companies-header">
                <h2>Lista de Empresas</h2>
                <button className="add-company-button" onClick={handleAddCompany}>
                    <FaPlus /> Cadastrar Empresa
                </button>
            </div>

            <table className="companies-table">
                <thead>
                    <tr>
                        <th>Nome Fantasia</th>
                        <th>Razão Social</th>
                        <th>CNPJ</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map(company => (
                        <tr key={company._id}>
                            <td>{company.name}</td>
                            <td>{company.razaoSocial}</td>
                            <td>{company.cnpj}</td>
                            <td>
                                <FaEdit className="action-icon edit" onClick={() => handleEdit(company)} />
                                <FaTrash className="action-icon delete" onClick={() => handleDelete(company._id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <CompaniesForm
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveCompany}
                />
            )}

            {editingCompany && (
                <CompaniesEdit
                    company={editingCompany}
                    onClose={() => setEditingCompany(null)}
                    onSave={handleUpdateCompany}
                />
            )}

        </div>
    )
}

export default CompaniesList
