import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { FaBuilding, FaBoxOpen, FaUsers, FaShoppingCart, FaSignOutAlt, FaPlusCircle } from "react-icons/fa";
import "../../styles.css";

function DashboardLayout() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const handleLogout = () => {
    alert("Você saiu da conta!");
    navigate("/login");
  };

  const handleMenuClick = (menu, path) => {
    setActiveMenu(menu);
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 onClick={() => handleMenuClick("Dashboard", "/dashboard")} style={{ cursor: "pointer" }}>Dashboard</h2>
        <ul>
          <li onClick={() => handleMenuClick("Empresas", "/dashboard/companies")} className={activeMenu === "Empresas" ? "active" : ""}>
            <FaBuilding /> Empresas
          </li>
          <li onClick={() => handleMenuClick("Clientes", "/dashboard/clients")} className={activeMenu === "Clientes" ? "active" : ""}>
            <FaUsers /> Clientes
          </li>
          <li onClick={() => handleMenuClick("Produtos", "/dashboard/products")} className={activeMenu === "Produtos" ? "active" : ""}>
            <FaBoxOpen /> Produtos
          </li>
          <li onClick={() => handleMenuClick("Pedidos", "/dashboard/orders")} className={activeMenu === "Pedidos" ? "active" : ""}>
            <FaShoppingCart /> Pedidos
          </li>
          <li onClick={() => handleMenuClick("Lançar Pedidos", "/dashboard/orderlaunch")} className={activeMenu === "Lançar Pedidos" ? "active" : ""}>
            <FaPlusCircle /> Lançar Pedidos
          </li>
          <li onClick={() => handleMenuClick("Usuários", "/dashboard/users")} className={activeMenu === "Usuários" ? "active" : ""}>
            <FaUsers /> Usuários
          </li>
          <li onClick={handleLogout}> <FaSignOutAlt /> Sair </li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>{activeMenu}</h1>
        </div>
        {/* Aqui o conteúdo muda de acordo com a rota */}
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
