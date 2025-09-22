import React, { useState, useEffect } from "react"
import { FaTimes } from "react-icons/fa"
import "../../styles.css"

function ClientEdit({ client, empresas = [], onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telefone: "",
    empresa: ""
  })

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || "",
        email: client.email || "",
        telefone: client.telefone || "",
        empresa: client.empresa || "",
        _id: client._id
      })
    }
  }, [client])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleTelefoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length > 11) value = value.slice(0, 11)
    value = value.replace(/^(\d{2})(\d)/, "($1) $2")
    value = value.replace(/(\d{4,5})(\d{4})$/, "$1-$2")
    setFormData({ ...formData, telefone: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const empresaSelecionada = empresas.find(e => e.name === formData.empresa)

    onSave({
      ...formData,
      _id: client._id,
      cnpj: empresaSelecionada ? empresaSelecionada.cnpj : ""
    })
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Editar Cliente</h3>
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

export default ClientEdit
