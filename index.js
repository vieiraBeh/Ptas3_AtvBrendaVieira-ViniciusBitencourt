const prisma = require("./prisma/prismaClient");

const express = require("express");
const cors = require("cors")

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

app.listen(8000);