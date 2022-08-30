const ControllerCarrinho = require('../controllers/routes/ControllerCarrinho')
const { verificaToken } = require('../controllers/routes/ControllerUsuario')
const express = require("express");
const router = express.Router();


router.get('/carrinho/:key', verificaToken, ControllerCarrinho.buscarCarrinho);



module.exports = router;