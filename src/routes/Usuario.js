const ControllerUsuario = require('../controllers/routes/ControllerUsuario')
const express = require("express");
const router = express.Router();


router.get('/acesso', ControllerUsuario.acesso);


module.exports = router;