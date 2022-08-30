const ControllerPerfil = require('../controllers/routes/ControllerPerfil')
const { verificaToken } = require('../controllers/routes/ControllerUsuario')
const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './src/images/temp' })

router.get('/perfil/:key', verificaToken, ControllerPerfil.buscarPerfil);
router.post('/upload-perfil', upload.single('image'), ControllerPerfil.atualizarPerfil)


module.exports = router