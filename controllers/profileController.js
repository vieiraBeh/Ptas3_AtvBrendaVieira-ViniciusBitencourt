const prisma = require("../prisma/prismaClient");

class ProfileController {
    static async mostrarProfile(req, res) {
        const perfil = await prisma.usuario.findUnique({
            select: {email: true,nome: true,tipo: true},
            where: { id: req.usuarioId },
        });

        return res.status(200).json({
            erro: false,
            mensagem: "Mostrando perfil do usuário",
            usuario: perfil,
        })
    }

    static async atualizarProfile(req, res) {
        const { nome, email } = req.body;
        
        const existe = await prisma.usuario.count({
            where: {
                email: email,
                id: { not: req.usuarioId },
            }
        });
        if (existe != 0) {
            return res.status(422).json({
                erro: true,
                mensagem: "Já existe um usuário cadastrado com este e-mail.",
            });
        }

        try {
            const atualizaProfile = await prisma.usuario.update({
                where: {
                    id: req.usuarioId
                },
                data: {
                    email: email,
                    nome: nome,
                }
            })

            console.log(JSON.stringify(atualizaProfile));
            

            return res.status(201).json({
                erro: false,
                mensagem: "Usuário atualizado com sucesso!",
            });

        } catch (error) {
            return res.status(500).json({
                erro: true,
                mensagem: "Ocorreu um erro, tente novamente mais tarde! " + error,
            });
        }
    }

    static async buscarUsuarios(req, res) {
        try {
            const buscados = await prisma.usuario.findMany({
                omit: { password: true },
            });
    
            return res.status(200).json({
                erro: false,
                mensagem: "Usuários buscados com sucesso!",
                usuarios: buscados,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                erro: true,
                mensagem: "Erro ao buscar usuários.",
            });
        }
    }
}

module.exports = ProfileController;