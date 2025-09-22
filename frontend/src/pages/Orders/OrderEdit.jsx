import React, { useState, useEffect } from "react"
import { FaTimes } from "react-icons/fa"
import "../../styles.css"

function OrderEdit({ order, clientes = [], empresas = [], onClose, onSave }) {
    const [formData, setFormData] = useState({
        name: "",
        numero: "",
        cliente: "",
        empresa: "",
        observacao: "",
        data: ""
    })

    const formatDateForInput = (isoDate) => {
        if (!isoDate) return ""
        return isoDate.split("T")[0]
    }

    const formatDateForAPI = (inputDate) => {
        if (!inputDate) return ""
        const [year, month, day] = inputDate.split("-")
        return `${day}/${month}/${year}`
    }

    useEffect(() => {
        if (order) {
            const empresaSelecionada = empresas.find(e => e.name === order.empresa)
            const clienteSelecionada = clientes.find(c => c.name === order.cliente)
            setFormData({
                name: order.name || "",
                numero: order.numero || "",
                empresa: empresaSelecionada ? empresaSelecionada.name : "",
                cliente: clienteSelecionada ? clienteSelecionada.name : "",
                observacao: order.observacao || "",
                data: formatDateForInput(order.data),
                _id: order._id
            })
        }
    }, [order])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const empresaSelecionada = empresas.find(e => e.name === formData.empresa)
        const clienteSelecionado = clientes.find(c => c.name === formData.cliente)
        onSave({
            ...formData,
            _id: order._id,
            empresa: empresaSelecionada ? empresaSelecionada.name : "",
            cliente: clienteSelecionado ? clienteSelecionado.name : "",
            data: formatDateForAPI(formData.data)
        })
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Editar Pedido</h3>
                    <button className="close-button" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Nome</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Número</label>
                        <input
                            type="number"
                            name="numero"
                            value={formData.numero}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Cliente</label>
                        <select
                            name="cliente"
                            value={formData.cliente}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Selecione um cliente</option>
                            {clientes.map((cli) => (
                                <option key={cli.id} value={cli.name}>
                                    {cli.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Empresa</label>
                        <select
                            name="empresa"
                            value={formData.empresa}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Selecione uma empresa</option>
                            {empresas.map((emp) => (
                                <option key={emp.id} value={emp.name}>
                                    {emp.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Observação</label>
                        <input
                            type="text"
                            name="observacao"
                            value={formData.observacao}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Data</label>
                        <input
                            type="date"
                            name="data"
                            value={formData.data}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Salvar Alterações
                    </button>
                </form>
            </div>
        </div>
    )
}

export default OrderEdit
