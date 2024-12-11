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

const ProfileRoutes = require("./routes/ProfileRoutes");
app.use("/perfil", ProfileRoutes);



app.listen(8000);