import React, { useState } from "react"
import { FaTimes } from "react-icons/fa"
import "../../styles.css"

function ClientForm({ onClose, onSave, empresas = [] }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        telefone: "",
        empresa: ""
    })

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleTelefoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/^(\d{2})(\d)/, "($1) $2");
        value = value.replace(/(\d{4,5})(\d{4})$/, "$1-$2");
        setFormData({ ...formData, telefone: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            alert("Digite um email válido!")
            return
        }

        if (!formData.empresa) {
            alert("Selecione uma empresa!")
            return
        }

        onSave(formData);
        setFormData({ name: "", email: "", telefone: "", empresa: "" })
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Cadastrar Cliente</h3>
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
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Telefone</label>
                        <input
                            type="text"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleTelefoneChange}
                            maxLength={15}
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

export default ClientForm;
