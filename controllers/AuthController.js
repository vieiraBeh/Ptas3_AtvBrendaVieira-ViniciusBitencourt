const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class AuthController{
    static async cadastro(req, res){
        const {nome, email, password, tipo} = req.body;

        if(!nome || nome.lenght < 6){
            return res.json({
                erro : true,
                mensagem: "Nome deve ter pelo menos 6 caracteres."
            });
        }
        return res.json({
            erro: false, 
            mensagem: "Usuário cadastrado com sucesso!",
            token: "3klçjdfusda9f8as341"
        });
    }

    static async login(req, res){}
}

module.exports =  AuthController;