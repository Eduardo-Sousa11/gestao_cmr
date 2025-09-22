import React, { useState, useEffect } from "react"
import { FaTimes } from "react-icons/fa"
import "../../styles.css"

function CompaniesEdit({ company, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    razaoSocial: "",
    cnpj: ""
  })

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name,
        razaoSocial: company.razaoSocial,
        cnpj: company.cnpj,
        _id: company._id
      })
    }
  }, [company]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, _id: company._id  })
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Editar Empresa</h3>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Nome Fantasia</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Razão Social</label>
            <input
              type="text"
              name="razaoSocial"
              value={formData.razaoSocial}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>CNPJ</label>
            <input
              type="text"
              name="cnpj"
              value={formData.cnpj}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                value = value.replace(/^(\d{2})(\d)/, "$1.$2");
                value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
                value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
                value = value.replace(/(\d{4})(\d)/, "$1-$2");
                setFormData({ ...formData, cnpj: value });
              }}
              maxLength={18}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}

export default CompaniesEdit
