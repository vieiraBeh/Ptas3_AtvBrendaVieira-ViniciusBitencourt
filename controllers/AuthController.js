const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class AuthController{
    static async cadastro(req, res){}

    static async login(req, res){}
}

module.exports =  AuthController;