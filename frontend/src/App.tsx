import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Home/Dashboard";
import Companies from "./pages/Companies/CompaniesList";
import Clients from "./pages/Clients/ClientsList";
import Products from "./pages/Products/ProductsList";
import Orders from "./pages/Orders/OrdersList";
import OrderLaunch from "./pages/OrderLaunch/OrderLaunchList";
import Users from "./pages/Users/UsersList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Todas as páginas do dashboard vão usar o layout */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<div className="home-content">
                        <h2>Bem-vindo ao Sistema</h2>
                        <p>Este sistema permite gerenciar empresas, produtos, clientes e pedidos de forma prática e organizada. Utilize o menu lateral para navegar entre as funcionalidades.</p>
                        <p>Você terá acesso rápido às informações importantes e relatórios de desempenho, além de poder configurar sua conta facilmente.</p>
                    </div>} />
        <Route path="companies" element={<Companies />} />
        <Route path="clients" element={<Clients />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orderlaunch" element={<OrderLaunch />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
