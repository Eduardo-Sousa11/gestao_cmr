import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import '../../styles.css'
import ClientForm from './ClientForm'
import ClientEdit from './ClientEdit'
import api from "../../services/api"

function ClientList() {
    const [clients, setClients] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingClient, setEditingClient] = useState(null)
    const [companies, setCompanies] = useState([])

    const getToken = () => localStorage.getItem("token")

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const token = getToken()
                if (!token) return

                const response = await api.get('/clients', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setClients(response.data)
            } catch (error) {
                console.error("Erro ao buscar clientes:", error)
            }
        }

        const fetchCompanies = async () => {
            try {
                const token = getToken()
                if (!token) return

                const response = await api.get('/companies', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setCompanies(response.data)
            } catch (error) {
                console.error("Erro ao buscar empresas:", error)
            }
        }

        fetchClients()
        fetchCompanies()
    }, [])

    const handleEdit = (client) => setEditingClient(client)

    const handleUpdateClient = async (updatedClient) => {
        try {
            const token = getToken()
            const response = await api.put(`/clients/${updatedClient._id}`, updatedClient, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setClients(clients.map(c => c._id === updatedClient._id ? response.data : c))
            setEditingClient(null)
            alert('Cliente atualizado com sucesso!')
        } catch (error) {
            console.error("Erro ao atualizar cliente:", error)
            alert("Erro ao atualizar cliente")
        }
    }

    const handleDelete = async (clientId) => {
        if (window.confirm('Deseja realmente excluir este cliente?')) {
            try {
                const token = getToken()
                await api.delete(`/clients/${clientId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setClients(clients.filter(c => c._id !== clientId))
                alert('Cliente excluído com sucesso!')
            } catch (error) {
                console.error("Erro ao excluir cliente:", error)
                alert("Erro ao excluir cliente")
            }
        }
    }

    const handleAddClient = () => setIsModalOpen(true)

    const handleSaveClient = async (newClient) => {
        try {
            const token = getToken()
            const response = await api.post('/clients', newClient, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setClients([...clients, response.data])
            setIsModalOpen(false)
            alert('Cliente criado com sucesso!')
        } catch (error) {
            console.error("Erro ao salvar cliente:", error)
            alert("Erro ao salvar cliente")
        }
    }

    return (
        <div className="companies-container">
            <div className="companies-header">
                <h2>Lista de Clientes</h2>
                <button className="add-company-button" onClick={handleAddClient}>
                    <FaPlus /> Cadastrar Clientes
                </button>
            </div>

            <table className="companies-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Empresa</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client._id}>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.telefone}</td>
                            <td>{client.empresa}</td>
                            <td>
                                <FaEdit className="action-icon edit" onClick={() => handleEdit(client)} />
                                <FaTrash className="action-icon delete" onClick={() => handleDelete(client._id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <ClientForm
                    empresas={companies}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveClient}
                />
            )}

            {editingClient && (
                <ClientEdit
                    client={editingClient}
                    empresas={companies}
                    onClose={() => setEditingClient(null)}
                    onSave={handleUpdateClient}
                />
            )}
        </div>
    )
}

export default ClientList
