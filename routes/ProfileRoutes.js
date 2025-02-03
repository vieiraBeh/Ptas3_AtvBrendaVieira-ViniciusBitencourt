const express = require("express");
const router = express.Router(); 

const ProfileController = require("../controllers/ProfileController");
const AuthController = require("../controllers/AuthController");

router.get("/", ProfileController.mostrarProfile);

router.patch("/", ProfileController.atualizarProfile);

router.get("/todos", AuthController.verificaAdm, ProfileController.buscarUsuarios)

module.exports = router;