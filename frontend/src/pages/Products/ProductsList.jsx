import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import '../../styles.css'
import ProductForm from './ProductForm'
import ProductEdit from './ProductEdit'
import api from "../../services/api"

function ProductList() {
    const [products, setProducts] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [companies, setCompanies] = useState([])

    // Buscar produtos e empresas do backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products')
                setProducts(response.data)
            } catch (error) {
                console.error("Erro ao buscar produtos:", error)
            }
        }

        const fetchCompanies = async () => {
            try {
                const response = await api.get('/companies')
                setCompanies(response.data)
            } catch (error) {
                console.error("Erro ao buscar empresas:", error)
            }
        }

        fetchProducts()
        fetchCompanies()
    }, [])

    const handleEdit = (product) => {
        setEditingProduct(product)
    }

    const handleUpdateProduct = async (updatedProduct) => {
        try {
            let valorNumerico = updatedProduct.valor
            if (typeof valorNumerico === "string") {
                valorNumerico = parseFloat(
                    valorNumerico
                        .replace(/\./g, '')
                        .replace(',', '.')
                        .replace('R$ ', '')
                )
            }
            const productToSend = {
                ...updatedProduct,
                valor: valorNumerico
            }
            const response = await api.put(`/products/${updatedProduct._id}`, productToSend)
            setProducts(products.map(p => p._id === updatedProduct._id ? response.data : p))
            setEditingProduct(null)
            alert('Produto atualizado com sucesso!')
        } catch (error) {
            console.error("Erro ao atualizar produto:", error)
            alert("Erro ao atualizar produto")
        }
    }


    const handleDelete = async (productId) => {
        if (window.confirm('Deseja realmente excluir este produto?')) {
            try {
                await api.delete(`/products/${productId}`)
                setProducts(products.filter(p => p._id !== productId))
                alert('Produto excluído com sucesso!')
            } catch (error) {
                console.error("Erro ao excluir produto:", error)
                alert("Erro ao excluir produto")
            }
        }
    }

    const handleAddProduct = () => {
        setIsModalOpen(true)
    }

    const handleSaveProduct = async (newProduct) => {
        try {
            if (!newProduct.valor) {
                alert("Preencha o valor do produto")
                return
            }

            // Remove tudo que não é número ou vírgula, substitui vírgula por ponto
            let valorNumerico = newProduct.valor.replace(/[^\d,]/g, '').replace(',', '.')

            // Converte para Number
            valorNumerico = parseFloat(valorNumerico)

            const productToSend = {
                ...newProduct,
                valor: valorNumerico
            }

            const response = await api.post('/products', productToSend)
            setProducts([...products, response.data])
            setIsModalOpen(false)
            alert('Produto criado com sucesso!')
        } catch (error) {
            console.error("Erro ao salvar produto:", error)
            alert("Erro ao salvar produto")
        }
    }



    return (
        <div className="companies-container">
            <div className="companies-header">
                <h2>Lista de Produtos</h2>
                <button className="add-company-button" onClick={handleAddProduct}>
                    <FaPlus /> Cadastrar Produtos
                </button>
            </div>

            <table className="companies-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Descrição</th>
                        <th>Empresa</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                            <td>{product.descricao}</td>
                            <td>{product.empresa}</td>
                            <td>
                                <FaEdit className="action-icon edit" onClick={() => handleEdit(product)} />
                                <FaTrash className="action-icon delete" onClick={() => handleDelete(product._id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <ProductForm
                    empresas={companies}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveProduct}
                />
            )}

            {editingProduct && (
                <ProductEdit
                    product={editingProduct}
                    empresas={companies}
                    onClose={() => setEditingProduct(null)}
                    onSave={handleUpdateProduct}
                />
            )}
        </div>
    )
}

export default ProductList
