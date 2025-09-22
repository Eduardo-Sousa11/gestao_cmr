import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import '../../styles.css'
import OrdersForm from './OrderForm'
import OrdersEdit from './OrderEdit'
import api from "../../services/api"

function OrderList() {
    const [orders, setOrders] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingOrder, setEditingOrder] = useState(null)
    const [companies, setCompanies] = useState([])
    const [clients, setClients] = useState([])

    const convertToISO = (dateStr) => {
        const [day, month, year] = dateStr.split('/')
        return `${year}-${month}-${day}`
    }

    const formatDateBR = (isoDate) => {
        if (!isoDate) return '';
        // Pega somente a parte "yyyy-mm-dd"
        const datePart = isoDate.split('T')[0];
        const [year, month, day] = datePart.split('-');
        return `${day}/${month}/${year}`;
    }


    useEffect(() => {

        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders')
                setOrders(response.data)
            } catch (error) {
                console.error("Erro ao buscar pedidos:", error)
            }
        }

        const fetchCompanies = async () => {
            try {
                const response = await api.get('/companies')
                setCompanies(response.data)
            } catch (error) {
                console.error("Erro ao buscar empresas:", error)
            }
        }

        const fetchClients = async () => {
            try {
                const response = await api.get('/clients')
                setClients(response.data)
            } catch (error) {
                console.error("Erro ao buscar clientes:", error)
            }
        }

        fetchCompanies()
        fetchClients()
        fetchOrders()
    }, [])

    const handleEdit = (order) => {
        setEditingOrder(order)
    }

    const handleUpdateOrder = async (updatedOrder) => {
        try {
            const orderToSend = {
                ...updatedOrder,
                data: convertToISO(updatedOrder.data)
            }

            const response = await api.put(`/orders/${updatedOrder._id}`, orderToSend)
            setOrders(orders.map(o => o._id === updatedOrder._id ? response.data : o))
            setEditingOrder(null)
            alert('Pedido atualizado com sucesso!')
        } catch (error) {
            console.error('Erro ao atualizar pedido:', error)
            alert('Erro ao atualizar pedido')
        }
    }


    const handleDelete = async (orderId) => {
        if (window.confirm('Deseja realmente excluir este pedido?')) {
            try {
                await api.delete(`/orders/${orderId}`)
                setOrders(orders.filter(o => o._id !== orderId))
                alert('Pedido excluído com sucesso!')
            } catch (error) {
                console.error('Erro ao excluir pedido:', error)
                alert('Erro ao excluir pedido')
            }
        }
    }

    const handleAddOrder = () => {
        setIsModalOpen(true)
    }

    const handleSaveOrder = async (newOrder) => {
        try {
            const orderToSend = {
                ...newOrder,
                data: convertToISO(newOrder.data)
            }

            const response = await api.post('/orders', orderToSend)
            setOrders([...orders, response.data])
            setIsModalOpen(false)
            alert('Pedido criado com sucesso!')
        } catch (error) {
            console.error('Erro ao criar pedido:', error)
            alert('Erro ao criar pedido')
        }
    }

    return (
        <div className="companies-container">
            <div className="companies-header">
                <h2>Lista de Pedidos</h2>
                <button className="add-company-button" onClick={handleAddOrder}>
                    <FaPlus /> Cadastrar Pedidos
                </button>
            </div>

            <table className="companies-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Numero do Pedido</th>
                        <th>Cliente</th>
                        <th>Empresa</th>
                        <th>Observação</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.name}</td>
                            <td>{order.numero}</td>
                            <td>{order.cliente}</td>
                            <td>{order.empresa}</td>
                            <td>{order.observacao}</td>
                            <td>{formatDateBR(order.data)}</td>
                            <td>
                                <FaEdit className="action-icon edit" onClick={() => handleEdit(order)} />
                                <FaTrash className="action-icon delete" onClick={() => handleDelete(order._id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de Cadastro */}
            {isModalOpen && (
                <OrdersForm
                    empresas={companies}
                    clientes={clients}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveOrder}
                />
            )}

            {/* Modal de Edição */}
            {editingOrder && (
                <OrdersEdit
                    order={editingOrder}
                    empresas={companies}
                    clientes={clients}
                    onClose={() => setEditingOrder(null)}
                    onSave={handleUpdateOrder}
                />
            )}

        </div>
    );
}

export default OrderList
