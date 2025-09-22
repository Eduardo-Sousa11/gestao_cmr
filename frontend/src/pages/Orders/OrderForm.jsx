import React, { useState } from "react"
import { FaTimes } from "react-icons/fa"
import "../../styles.css"

function OrderForm({ onClose, onSave, clientes = [], empresas = [] }) {
    const [formData, setFormData] = useState({
        name: "",
        numero: "",
        cliente: "",
        empresa: "",
        observacao: "",
        data: ""
    })

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.empresa) {
            alert("Selecione uma empresa!")
            return
        }

        if (!formData.cliente) {
            alert("Selecione um cliente!")
            return
        }

        onSave(formData);
        setFormData({ name: "", numero: "", cliente: "", empresa: "", observacao: "", data: "" })
    }

    const handleDateChange = (e) => {
        const [year, month, day] = e.target.value.split("-")
        setFormData({ ...formData, data: `${day}/${month}/${year}` })
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Cadastrar Pedido</h3>
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
                        <label>Numero</label>
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
                                <option key={cli.name} value={cli.name}>
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
                                <option key={emp.name} value={emp.name}>
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
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Data</label>
                        <input
                            type="date"
                            name="data"
                            value={
                                formData.data
                                    ? `${formData.data.split("/")[2]}-${formData.data.split("/")[1]}-${formData.data.split("/")[0]}`
                                    : ""
                            }
                            onChange={handleDateChange}
                            required
                        />
                    </div>


                    <button type="submit" className="submit-button">
                        Salvar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default OrderForm
