const express = require("express");
const router = require("express").Router();

const MesaController = require("../controllers/MesaController");
const AuthController = require("../controllers/AuthController");

router.post("/novo", AuthController.verificaAutenticacao, AuthController.verificaAdm, MesaController.cadastrarMesa);

router.get("/", MesaController.mostrarMesas)

router.get("/disponibilidade", MesaController.mostrarMesaData)

module.exports = router;