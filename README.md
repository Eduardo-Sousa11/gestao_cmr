# Gestão CMR

Aplicação full-stack para gestão de empresas, clientes, produtos, pedidos e lançamentos de pedidos.

Este repositório é composto por dois projetos:
- `backend`: API REST em Node.js/Express com MongoDB (Mongoose), autenticação JWT e CORS.
- `frontend`: SPA em React que consome a API do backend.

## Sumário
- Visão Geral
- Stack e Requisitos
- Como rodar (backend e frontend)
- Variáveis de ambiente
- Scripts disponíveis
- Endpoints da API (rotas)
- Modelos (schemas)
- Estrutura de pastas

## Visão Geral
O sistema permite gerenciar:
- Empresas
- Clientes
- Produtos
- Pedidos
- Lançamentos de pedidos (itens/lançamentos vinculados a pedidos e produtos)
- Usuários (registro, login e CRUD)

O frontend (React) comunica-se com a API em `http://localhost:3000` por padrão.

## Stack e Requisitos
- Node.js (>= 18 recomendado)
- npm (ou yarn)
- MongoDB em execução e acessível via `MONGO_URI`

Bibliotecas principais (backend):
- express, cors, dotenv
- mongoose
- jsonwebtoken, bcryptjs
- nodemon (dev)

Bibliotecas principais (frontend):
- react, react-dom, react-router-dom
- axios, react-icons, react-input-mask
- react-scripts

## Como rodar

### 1) Backend
1. Acesse a pasta do backend:
   ```bash
   cd backend
   npm install
   ```
2. Configure o arquivo `.env` (ver seção Variáveis de ambiente).
3. Inicie o servidor (porta 3000):
   ```bash
   npm run dev
   # ou
   npm start
   ```

### 2) Frontend
1. Acesse a pasta do frontend:
   ```bash
   cd frontend
   npm install
   ```
2. Inicie o app React:
   ```bash
   npm run start
   ```
   Por padrão, o frontend usará a API em `http://localhost:3000` conforme `src/services/api.js`.

## Variáveis de ambiente (backend)
Crie um arquivo `backend/.env` com as chaves abaixo:
```env
MONGO_URI=mongodb://localhost:27017/gestao_cmr
JWT_SECRET=um_segredo_forte
```

Observações:
- `MONGO_URI` é obrigatória para conexão com o MongoDB.
- `JWT_SECRET` é usado para assinar tokens de autenticação (padrão de fallback no código é `segredo123`, mas configure um valor seguro em produção).

## Scripts

### Backend (`backend/package.json`)
- `npm run dev`: inicia com nodemon em `server.js`.
- `npm start`: inicia com Node.

### Frontend (`frontend/package.json`)
- `npm start` ou `npm run dev`: inicia o React App (react-scripts).
- `npm run build`: build de produção.
- `npm test`: testes (padrão create-react-app).

## Endpoints da API
Base URL: `http://localhost:3000`

### Empresas (`/companies`)
- GET `/companies` — lista todas
- GET `/companies/:id` — busca por ID
- POST `/companies` — cria empresa
  - body: `{ name, razaoSocial, cnpj }` (CNJP no formato `99.999.999/9999-99`)
- PUT `/companies/:id` — atualiza empresa
- DELETE `/companies/:id` — remove empresa

### Clientes (`/clients`)
- GET `/clients` — lista todos
- GET `/clients/:id` — busca por ID
- POST `/clients` — cria cliente
  - body: `{ name, email, telefone?, empresa }`
- PUT `/clients/:id` — atualiza cliente
- DELETE `/clients/:id` — remove cliente

### Produtos (`/products`)
- GET `/products` — lista todos
- GET `/products/:id` — busca por ID
- POST `/products` — cria produto
  - body: `{ name, valor (Number), descricao?, empresa }`
- PUT `/products/:id` — atualiza produto
- DELETE `/products/:id` — remove produto

### Pedidos (`/orders`)
- GET `/orders` — lista todos (ordenado por `createdAt` desc)
- GET `/orders/:id` — busca por ID
- POST `/orders` — cria pedido
  - body: `{ name, numero (único), cliente, empresa, observacao?, data (Date) }`
- PUT `/orders/:id` — atualiza pedido
- DELETE `/orders/:id` — remove pedido

### Lançamentos de Pedido (`/orderslaunch`)
- GET `/orderslaunch` — lista todos (ordenado por `createdAt` desc)
- GET `/orderslaunch/:id` — busca por ID
- POST `/orderslaunch` — cria lançamento
  - body: `{ pedido (ObjectId de Order), produto (ObjectId de Product), quantidade (Number >= 1) }`
- PUT `/orderslaunch/:id` — atualiza lançamento
- DELETE `/orderslaunch/:id` — remove lançamento

### Usuários (`/users`)
- POST `/users/register` — registra usuário + retorna token
  - body: `{ name, email, senha }`
- POST `/users/login` — autentica e retorna token
  - body: `{ email, senha }`
- GET `/users` — lista usuários (retorno: `{ id, name, email, senha }`)
- GET `/users/:id` — busca usuário por ID
- POST `/users` — cria usuário (atenção: controller utiliza `senha` no schema; evite `password`)
- PUT `/users/:id` — atualiza usuário
- DELETE `/users/:id` — remove usuário

Observação: as rotas de usuários expõem o campo `senha` no retorno atual; em produção, recomenda-se remover esse campo das respostas.

## Modelos (Mongoose Schemas)

### `Company`
```js
{ name: String (req), razaoSocial: String (req), cnpj: String (req, único, regex) }
```

### `Client`
```js
{ name: String (req), email: String (req, lower), telefone?: String, empresa: String (req) }
```

### `Product`
```js
{ name: String (req), valor: Number (req), descricao?: String, empresa: String (req) }
```

### `Order`
```js
{ name: String (req), numero: String (req, único), cliente: String (req), empresa: String (req), observacao?: String, data: Date (req, default: now) }
```

### `OrderLaunch`
```js
{ pedido: ObjectId(ref Order, req), produto: ObjectId(ref Product, req), quantidade: Number (req, min 1) }
```

### `User`
```js
{ name: String (req), email: String (req, único), senha: String (req) }
```
- Pre-save hash de `senha` com bcrypt.
- Métodos: `matchPassword(enteredPassword)`, `generateToken()` com `JWT_SECRET` e expiração de 1 dia.

## Estrutura de Pastas (resumo)

```
backend/
  controllers/ *.js
  models/ *.js
  routes/ *.js
  database/db.js
  server.js
frontend/
  src/
    pages/ (Auth, Clients, Companies, Orders, OrderLaunch, Products, Users)
    services/api.js
    App.tsx, index.js, index.css, styles.css
  public/
```

## CORS e URLs
- O backend está configurado para aceitar requisições do frontend em `http://localhost:5173`.
- O frontend usa `axios` com `baseURL` em `http://localhost:3000`.

## Notas e Boas Práticas
- Em produção, ajuste CORS, variáveis de ambiente e logging.
- Evite retornar `senha` em respostas de usuário.
- Valide formatos (ex.: CNPJ) e trate erros com mensagens consistentes.
