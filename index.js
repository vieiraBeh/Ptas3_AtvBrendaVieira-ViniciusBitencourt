const prisma = require("./prisma/prismaClient");

const express = require("express");
const cors = require("cors")

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(express.json());

//app.get("/meus-pedidos", AuthController. verificaAutenticacao(req, res)=> {
//    res.send("Veja seus pedidos abaixo:")
//});
const authRoutes = require("./routes/authRoutes");
const AuthController = require("./controllers/AuthController");
app.use("/auth", authRoutes);

const profileRoutes = require("./routes/profileRoutes");
app.use("/perfil", AuthController.autenticar, profileRoutes);

app.get("/privado", AuthController.verificaAutenticacao, (req, res) => {
    res.json({
        msg: "Você acessou uma rota restrita!"
    });
});

app.listen(8000);