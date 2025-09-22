import React, { useState, useEffect } from "react"
import { FaTimes } from "react-icons/fa"
import "../../styles.css"

function OrderLaunchEdit({ orderLaunch, produtos = [], pedidos = [], onClose, onSave }) {
    const [formData, setFormData] = useState({
        produto: "",
        pedido: "",
        quantidade: "",
        _id: ""
    })

    // Preenche o form quando o orderLaunch, produtos e pedidos estiverem carregados
    useEffect(() => {
        if (orderLaunch && produtos.length > 0 && pedidos.length > 0) {
            const produtoId = typeof orderLaunch.produto === 'object'
                ? (orderLaunch.produto?._id || "")
                : (orderLaunch.produto || "")
            const pedidoId = typeof orderLaunch.pedido === 'object'
                ? (orderLaunch.pedido?._id || "")
                : (orderLaunch.pedido || "")

            setFormData({
                quantidade: orderLaunch.quantidade || "",
                produto: produtoId,
                pedido: pedidoId,
                _id: orderLaunch._id
            })
        }
    }, [orderLaunch, produtos, pedidos])

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.produto || !formData.pedido) {
            alert("Selecione um produto e um pedido")
            return
        }

        // Envia os dados atualizados para o backend
        onSave(formData)
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Editar Pedido Lançado</h3>
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
                            type="text"
                            name="quantidade"
                            value={formData.quantidade}
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

export default OrderLaunchEdit
