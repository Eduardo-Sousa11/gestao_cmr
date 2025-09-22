const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Rotas CRUD de produtos
router.post("/", productController.createProduct);       // Criar produto
router.get("/", productController.getProducts);          // Listar todos
router.get("/:id", productController.getProductById);    // Buscar por ID
router.put("/:id", productController.updateProduct);     // Atualizar
router.delete("/:id", productController.deleteProduct);  // Deletar

module.exports = router;
