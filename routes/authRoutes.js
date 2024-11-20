const express = require("express");
const router = express.Router(); //subRotas

const AuthController = require("../controllers/AuthController");

router.post("/login", AuthController.login);
router.post("/cadastro", AuthController.cadastro);

module.exports = router;