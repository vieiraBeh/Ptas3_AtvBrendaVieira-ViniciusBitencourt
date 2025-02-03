const prisma = require("./prisma/prismaClient");

const express = require("express");

const AuthController = require("./controllers/AuthController");
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const authRouters = require("./routes/authRoutes");
app.use("/auth", authRouters);

const profileRoutes = require("./routes/profileRoutes");
app.use("/perfil", AuthController.verificaAutenticacao, profileRoutes);

const mesaRoutes = require("./routes/mesaRoutes");
app.use("/mesa", mesaRoutes);

const reservaRoutes = require("./routes/reservaRoutes");
app.use("/reservas", AuthController.verificaAutenticacao, reservaRoutes);

app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000");    
});