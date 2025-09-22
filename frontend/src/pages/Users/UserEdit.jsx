import React, { useState, useEffect } from "react"
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa"
import "../../styles.css"

function UsersEdit({ users, onClose, onSave }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        senha: ""
    });

    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (users) {
            setFormData({
                name: users.name,
                email: users.email,
                senha: users.senha
            })
        }
    }, [users]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formData, id: users.id })
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Editar Usuário</h3>
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
                            placeholder="seu@email.com"
                        />
                    </div>

                    <div className="form-group" style={{ position: "relative" }}>
                        <label>Senha</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="senha"
                            value={formData.senha}
                            onChange={handleInputChange}
                            required
                            placeholder="Digite sua senha"
                            minLength={6}
                            style={{ paddingRight: "30px" }}
                        />
                        <span
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                                marginTop: "14px"
                            }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <button type="submit" className="submit-button">
                        Salvar Alterações
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UsersEdit
