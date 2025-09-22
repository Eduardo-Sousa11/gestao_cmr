import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles.css'
import api from "../../services/api"

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)  
  const [error, setError] = useState('')  
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await api.post('/users/login', {
        email,
        senha: password
      })

      // Salva token e dados do usuário
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))

      setSuccess('Login realizado com sucesso!')

      // Redireciona depois de 1s
      setTimeout(() => navigate('/dashboard'), 1000)

    } catch (err) {
      console.error(err)
      // aqui vem exatamente a mensagem "Email ou senha incorretos"
      setError(err.response?.data?.message || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="login-icon">🔒</div>
        <h1>Bem-vindo</h1>
        <p>Faça login para continuar</p>
        <div className="login-form-container">
          <h2>Entrar</h2>
          <p>Digite suas credenciais para acessar sua conta</p>

          {/* ALERTAS */}
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="register-link">
            Não tem uma conta? <span onClick={() => navigate('/register')}>Cadastre-se</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
