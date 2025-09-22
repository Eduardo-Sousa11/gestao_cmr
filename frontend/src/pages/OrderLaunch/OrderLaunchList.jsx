import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import '../../styles.css'
import OrderLaunchForm from './OrderLaunchForm'
import OrderLaunchEdit from './OrderLaunchEdit'
import api from "../../services/api"

function OrdersLaunchList() {
    const [ordersLaunch, setOrdersLaunch] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingOrderLaunch, setEditingOrderLaunch] = useState(null)
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrdersLaunch = async () => {
            try {
                const response = await api.get('/orderslaunch')
                setOrdersLaunch(response.data)
            } catch (error) {
                console.error('Erro ao buscar lançamentos:', error)
                alert('Erro ao buscar lançamentos')
            }
        }

        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders')
                setOrders(response.data)
            } catch (error) {
                console.error('Erro ao buscar pedidos:', error)
                alert('Erro ao buscar pedidos')
            }
        }

        const fetchProducts = async () => {
            try {
                const response = await api.get('/products')
                setProducts(response.data)
            } catch (error) {
                console.error('Erro ao buscar produtos:', error)
                alert('Erro ao buscar produtos')
            }
        }

        fetchOrders()
        fetchProducts()
        fetchOrdersLaunch()
    }, [])

    const handleEdit = orderLaunch => {
        setEditingOrderLaunch(orderLaunch)
    }

    const handleUpdateOrderLaunch = async updatedOrderLaunch => {
        try {
            await api.put(`/orderslaunch/${updatedOrderLaunch._id}`, updatedOrderLaunch)
            const fullResponse = await api.get(`/orderslaunch/${updatedOrderLaunch._id}`)
            setOrdersLaunch(
                ordersLaunch.map(ol => ol._id === updatedOrderLaunch._id ? fullResponse.data : ol)
            )
            setEditingOrderLaunch(null)
            alert('Lançamento atualizado com sucesso!')
        } catch (error) {
            console.error('Erro ao atualizar lançamento:', error)
            alert('Erro ao atualizar lançamento')
        }
    }

    const handleDelete = async orderLaunchId => {
        if (window.confirm('Deseja realmente excluir este lançamento de pedido?')) {
            try {
                await api.delete(`/orderslaunch/${orderLaunchId}`)
                setOrdersLaunch(ordersLaunch.filter(ol => ol._id !== orderLaunchId))
                alert('Lançamento excluído com sucesso!')
            } catch (error) {
                console.error('Erro ao excluir lançamento:', error)
                alert('Erro ao excluir lançamento')
            }
        }
    }

    const handleAddOrderLaunch = () => {
        setIsModalOpen(true)
    }

    const handleSaveOrderLaunch = async newOrderLaunch => {
        try {
            const response = await api.post('/orderslaunch', newOrderLaunch)
            const fullResponse = await api.get(`/orderslaunch/${response.data._id}`)
            setOrdersLaunch([...ordersLaunch, fullResponse.data])
            setIsModalOpen(false)
            alert('Lançamento criado com sucesso!')
        } catch (error) {
            console.error('Erro ao salvar lançamento:', error)
            alert('Erro ao salvar lançamento')
        }
    }

    return (
        <div className="companies-container">
            <div className="companies-header">
                <h2>Lista de Lançamentos Pedidos</h2>
                <button className="add-company-button" onClick={handleAddOrderLaunch}>
                    <FaPlus /> Lançar pedidos
                </button>
            </div>

            <table className="companies-table">
                <thead>
                    <tr>
                        <th>Pedido</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {ordersLaunch.map(ol => (
                        <tr key={ol._id}>
                            <td>{ol.pedido?.name}</td>
                            <td>{ol.produto?.name}</td>
                            <td>{ol.quantidade}</td>
                            <td>
                                <FaEdit className="action-icon edit" onClick={() => handleEdit(ol)} />
                                <FaTrash className="action-icon delete" onClick={() => handleDelete(ol._id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <OrderLaunchForm
                    produtos={products}
                    pedidos={orders}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveOrderLaunch}
                />
            )}

            {editingOrderLaunch && (
                <OrderLaunchEdit
                    orderLaunch={editingOrderLaunch}
                    produtos={products}
                    pedidos={orders}
                    onClose={() => setEditingOrderLaunch(null)}
                    onSave={handleUpdateOrderLaunch}
                />
            )}
        </div>
    )
}

export default OrdersLaunchList
