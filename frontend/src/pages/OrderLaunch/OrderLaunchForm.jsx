import React, { useState } from "react"
import { FaTimes } from "react-icons/fa"
import "../../styles.css"

function OrderLaunchForm({ onClose, onSave, produtos = [], pedidos = [] }) {
    const [formData, setFormData] = useState({
        produto: "",
        pedido: "",
        quantidade: ""
    })

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.produto) {
            alert("Selecione um produto!")
            return
        }

        if (!formData.pedido) {
            alert("Selecione um pedido!")
            return
        }

        onSave(formData)
        setFormData({ produto: "", pedido: "", quantidade: "" })
    }


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Cadastrar Lançamento</h3>
                    <button className="close-button" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Produto</label>
                        <select
                            name="produto"
                            value={formData.produto}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Selecione um produto</option>
                            {produtos.map((pro) => (
                                <option key={pro._id} value={pro._id}>
                                    {pro.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Pedido</label>
                        <select
                            name="pedido"
                            value={formData.pedido}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Selecione um pedido</option>
                            {pedidos.map((ped) => (
                                <option key={ped._id} value={ped._id}>
                                    {ped.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Quantidade</label>
                        <input
                            type="number"
                            name="quantidade"
                            value={formData.quantidade}
                            onChange={handleInputChange}
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

export default OrderLaunchForm
