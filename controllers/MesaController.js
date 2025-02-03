const prisma = require("../prisma/prismaClient");

class MesaController {
    static async cadastrarMesa(req, res) {
        const { codigo, n_lugares } = req.body;

        if (n_lugares <= 0) {
            return res.status(422).json({
                erro: true,
                mensagem: "O número de lugares é invalido."
            })
        }

        const existe = await prisma.mesa.count({
            where: {
                codigo: codigo,
            }
        })

        if (existe != 0) {
            return res.status(422).json({
                erro: true,
                mensagem: "Já existe uma mesa cadastrado com este código."
            })
        }

        try {
            const novaMesa = await prisma.mesa.create({
                data: {
                    codigo: codigo,
                    n_lugares: n_lugares,
                }
            });

            console.log(JSON.stringify(novaMesa));

            return res.status(201).json({
                erro: false,
                mensagem: "Mesa cadastrada com sucesso!",
            })

        } catch (error) {
            return res.status(500).json({
                erro: true,
                mensagem: "Ocorreu um erro, tente novamente mais tarde! " + error,
            });
        }

    }

    static async mostrarMesas(req, res) {
        const mesas = await prisma.mesa.findMany();

        return res.status(200).json({
            erro: false,
            mensagem: "Mesas buscadas com sucesso!",
            mesas: mesas,
        });
    }

    static async mostrarMesaData(req, res) {
        const data = new Date(req.body.data);
    
        try {
            const mesasData = await prisma.mesa.findMany({
                where: {
                    reservas: {
                        some: {
                            data: {
                                equals: data,
                            },
                        },
                    },
                },
                include: {
                    reservas: {
                        where: {
                            data: {
                                equals: data,
                            },
                        },
                    },
                },
            });
    
            if (mesasData.length === 0) {
                return res.status(222).json({
                    erro: true,
                    mensagem: "Não existe nenhuma mesa reservada para esta data.",
                });
            }
    
            return res.status(200).json({
                erro: false,
                mensagem: `Mostra mesas por data realizada com sucesso!`,
                reservas: mesasData,
            });
    
        } catch (error) {
            return res.status(500).json({
                erro: true,
                mensagem: "Ocorreu um erro, tente novamente mais tarde! " + error.message,
            });
        }
    }
}

module.exports = MesaController;