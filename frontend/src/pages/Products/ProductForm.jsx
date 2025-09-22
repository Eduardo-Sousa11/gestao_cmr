import React, { useState } from "react"
import { FaTimes } from "react-icons/fa"
import "../../styles.css"

function ProductForm({ onClose, onSave, empresas = [] }) {
    const [formData, setFormData] = useState({
        name: "",
        valor: "",
        descricao: "",
        empresa: ""
    })

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleValorChange = (e) => {
        let value = e.target.value;

        value = value.replace(/\D/g, "");

        value = (Number(value) / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        setFormData({ ...formData, valor: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.empresa) {
            alert("Selecione uma empresa!")
            return
        }

        onSave(formData);
        setFormData({ name: "", valor: "", descricao: "", empresa: "" })
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Cadastrar Produto</h3>
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
                            value={formData.valor}
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
                                <option key={emp.name} value={emp.name}>
                                    {emp.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    <button type="submit" className="submit-button">
                        Salvar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ProductForm
