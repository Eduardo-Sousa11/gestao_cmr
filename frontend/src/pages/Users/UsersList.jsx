import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import '../../styles.css'
import UsersEdit from './UserEdit'
import api from "../../services/api"

function UsersList() {
    const [users, setUsers] = useState([])
    const [editingUser, setEditingUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) return

                const res = await api.get("/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUsers([res.data])
            } catch (err) {
                console.error("Erro ao buscar usuário:", err)
            }
        }
        fetchUser()
    }, [])

    const handleEdit = (user) => {
        setEditingUser(user)
    }

    const handleUpdateUser = async (updatedUser) => {
        try {
            const token = localStorage.getItem("token")
            const res = await api.put("/users/me", updatedUser, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUsers([res.data])
            setEditingUser(null)
            alert("Usuário atualizado com sucesso")
        } catch (err) {
            console.error("Erro ao atualizar usuário:", err)
        }
    }

    const handleDelete = async () => {
        if (window.confirm("Deseja realmente excluir sua conta?")) {
            try {
                const token = localStorage.getItem("token")
                await api.delete("/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUsers([])
                localStorage.removeItem("token")
                alert("Conta excluída com sucesso")
            } catch (err) {
                console.error("Erro ao excluir usuário:", err)
            }
        }
    }

    return (
        <div className="companies-container">
            <div className="companies-header">
                <h2>Meu Perfil</h2>
            </div>

            {users.length > 0 && (
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
                                    <FaTrash className="action-icon delete" onClick={handleDelete} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {editingUser && (
                <UsersEdit
                    users={editingUser}
                    onClose={() => setEditingUser(null)}
                    onSave={handleUpdateUser}
                />
            )}
        </div>
    )
}

export default UsersList
