const express = require("express");
const router = require("express").Router();

const ReservaController = require("../controllers/ReservaController");
const AuthController = require("../controllers/AuthController");

router.post("/novo", ReservaController.cadastrarReserva);

router.get("/", ReservaController.mostrarReservas);

router.delete("/", ReservaController.cancelarReserva);

router.get("/listar", AuthController.verificaAdm, ReservaController.mostrarReservasPorData)

module.exports = router;