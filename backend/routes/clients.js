const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

// Rotas CRUD de clientes
router.post("/", clientController.createClient);      // Criar cliente
router.get("/", clientController.getClients);         // Listar todos
router.get("/:id", clientController.getClientById);   // Buscar por ID
router.put("/:id", clientController.updateClient);    // Atualizar
router.delete("/:id", clientController.deleteClient); // Deletar

module.exports = router;
