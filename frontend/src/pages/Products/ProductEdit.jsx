import React, { useState, useEffect } from "react"
import { FaTimes } from "react-icons/fa"
import "../../styles.css"

function ProductEdit({ product, empresas = [], onClose, onSave }) {
    const [formData, setFormData] = useState({
        name: "",
        valor: 0,
        descricao: "",
        empresa: ""
    })

    useEffect(() => {
        if (product) {
            const empresaSelecionada = empresas.find(e => e.name === product.empresa)
            setFormData({
                name: product.name || "",
                valor: product.valor || 0, // mantém como número
                descricao: product.descricao || "",
                empresa: empresaSelecionada ? empresaSelecionada.name : "",
                _id: product._id
            })
        }
    }, [product, empresas])

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleValorChange = (e) => {
        let value = e.target.value.replace(/\D/g, "")
        setFormData({ ...formData, valor: Number(value) / 100 })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const empresaSelecionada = empresas.find(e => e.name === formData.empresa)
        onSave({
            ...formData,
            _id: product._id,
            empresa: empresaSelecionada ? empresaSelecionada.name : ""
        })
    }

    const valorFormatado = formData.valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Editar Produto</h3>
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
                        <label>Valor</label>
                        <input
                            type="text"
                            name="valor"
                            value={valorFormatado}
                            onChange={handleValorChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Descrição</label>
                        <input
                            type="text"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleInputChange}
                            required
                        />
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

                    <button type="submit" className="submit-button">
                        Salvar Alterações
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ProductEdit
