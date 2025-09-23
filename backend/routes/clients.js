const express = require("express")
const router = express.Router()
const clientController = require("../controllers/clientController")
const { authMiddleware } = require('../middleware/auth')

router.post("/", authMiddleware, clientController.createClient)
router.get("/", authMiddleware, clientController.getClients)
router.get("/:id", authMiddleware, clientController.getClientById)
router.put("/:id", authMiddleware, clientController.updateClient)
router.delete("/:id", authMiddleware, clientController.deleteClient)

module.exports = router
