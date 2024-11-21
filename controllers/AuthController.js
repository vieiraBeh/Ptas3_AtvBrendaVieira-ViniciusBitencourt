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

        if(!email || email.lenght < 10){
            return res.json({
                erro : true,
                mensagem: "O email deve ter pelo menos 10 caracteres."
            });
        }

        if(!password || password.lenght < 8){
            return res.json({
                erro : true,
                mensagem: "A senha deve ter pelo menos 8 caracteres."
            });
        }

        const existe = await prisma.usuario.count({
            where:{
                email: email,
            },
        });

        if(esxite != 0){
            return res.json({
                erro:true,
                mensagem: "Email já cadastrado."
            });
        }

        await prisma.usuario.create({
            data:{
                nome: nome,
                email: email,
                password: password,
                tipo: "cliente",
            },
        })

        //return res.json({
            //erro: false, 
            //mensagem: "Usuário cadastrado com sucesso!",
            //token: "3klçjdfusda9f8as341"
        //});
    }

    static async login(req, res){}
}

module.exports =  AuthController;