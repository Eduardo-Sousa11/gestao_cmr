import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import '../../styles.css'
import UsersEdit from './UserEdit'
import api from "../../services/api"

function UsersList() {
    const [users, setUsers] = useState([])
    const [editingUsers, setEditingUsers] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get("/users")
                setUsers(res.data);
            } catch (err) {
                console.error("Erro ao buscar usuários:", err)
            }
        };
        fetchUsers()
    }, [])

    const handleEdit = (users) => {
        setEditingUsers(users)
    }

    const handleUpdateUsers = async (updatedUser) => {
        try {
            const res = await api.put(`/users/${updatedUser.id}`, updatedUser)
            setUsers(users.map(u => u.id === updatedUser.id ? res.data : u))
            setEditingUsers(null)
            alert("Usuário atualizado com sucesso!")
        } catch (err) {
            console.error("Erro ao atualizar usuário:", err)
        }
    }

    const handleDelete = async (userId) => {
        if (window.confirm("Deseja realmente excluir este usuário?")) {
            try {
                await api.delete(`/users/${userId}`)
                setUsers(users.filter(u => u.id !== userId))
            } catch (err) {
                console.error("Erro ao excluir usuário:", err)
            }
        }
    }

    return (
        <div className="companies-container">
            <div className="companies-header">
                <h2>Lista de Usuários</h2>
            </div>

            <table className="companies-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <FaEdit className="action-icon edit" onClick={() => handleEdit(user)} />
                                <FaTrash className="action-icon delete" onClick={() => handleDelete(user.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de Edição */}
            {editingUsers && (
                <UsersEdit
                    users={editingUsers}
                    onClose={() => setEditingUsers(null)}
                    onSave={handleUpdateUsers}
                />
            )}

        </div>
    )
}

export default UsersList
