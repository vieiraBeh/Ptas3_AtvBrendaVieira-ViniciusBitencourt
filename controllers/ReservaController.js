const prisma = require("../prisma/prismaClient");

class ReservaController {
    static async cadastrarReserva(req, res) {
        const { mesa_id, n_pessoas } = req.body;
        const data = new Date(req.body.data);

        const mesa = await prisma.mesa.findUnique({
            where: { id: mesa_id },
            include: {
                reservas: {
                    where: {
                        data: data,
                        status: true,
                    }
                }
            }
        })

        if (mesa.reservas.length > 0) {
            return res.status(400).json({
                erro: true,
                mensagem: "A mesa selecionada já está reservada para esta data.",
            });
        }

        if (data < new Date()) {
            return res.status(400).json({
                erro: true,
                mensagem: "Insira uma data que seja igual ou posterior ao dia de hoje."
            });
        }

        if (mesa.n_lugares < n_pessoas) {
            return res.status(422).json({
                erro: true,
                mensagem: "O número de pessoas ultrapassou a capacidade da mesa."
            });
        }

        prisma.reserva.create({
            data: {
                data: data,
                n_pessoas: n_pessoas,
                usuario: {
                    connect: {
                        id: req.usuarioId,
                    },
                },
                mesa: {
                    connect: {
                        id: mesa_id,
                    },
                },
            },
        }).then(() => {
            return res.status(200).json({
                erro: false,
                mensagem: "Reserva realizada com sucesso",
            })
        })
            .catch((error) => {
                return res.status(201).json({
                    erro: true,
                    mensagem: "Ocorreu um erro ao cadastrar reserva." + error,
                })
            });

    }

    static async mostrarReservas(req, res) {
        try {
            const quantReservas = await prisma.reserva.findMany({
                where: {
                    usuarioId: req.usuarioId, 
                },
                include: {
                    mesa: true,
                },
            });

            if (quantReservas.length == 0) {
                return res.status(222).json({
                    erro: true,
                    mensagem: "O usuario não tem reserva.",
                    reservas: quantReservas
                })
            }


            return res.status(200).json({
                erro: false,
                mensagem: "Reservas mostradas com sucesso",
                reservas: quantReservas,
            });
        } catch (error) {
            return res.status(500).json({
                erro: true,
                mensagem: "Ocorreu um erro, tente novamente mais tarde! " + error.message,
            });
        }
    }

    static async cancelarReserva(req, res) {
        const reservaId = req.body.reservaId;

        if (!reservaId) {
            return res.status(401).json({
                erro: true,
                mensagem: "O usuário não tem reserva para cancelar",
            })
        }

        try {
            const cancelar = await prisma.reserva.delete({
                where: {
                    id: reservaId,
                },
            });

            console.log(JSON.stringify(cancelar));

            return res.status(200).json({
                erro: false,
                mensagem: "Reserva cancelada com sucesso!",
            });
        } catch (error) {
            return res.status(500).json({
                erro: true,
                mensagem: "Ocorreu um erro ao cancelar a reserva. " + error.message,
            });
        }
    }

    static async mostrarReservasPorData(req, res) {
        const data = new Date(req.body.data);

        try {
            const reservasData = await prisma.reserva.findMany({
                where: {
                    data: data
                },
                include: {
                    usuario: true,
                    mesa: true,
                }
            })

            if (reservasData.length == 0) {
                return res.status(222).json({
                    erro: true,
                    mensagem: "Não existe reserva cadastrada nesta data.",
                });
            }

            return res.status(201).json({
                erro: false,
                mensagem: `Busca realizada com sucesso!`,
                reservas: reservasData,
            });

        } catch (error) {
            return res.status(500).json({
                erro: true,
                mensagem: "Ocorreu um erro, tente novamente mais tarde! " + error.message,
            });
        }


    }

}

module.exports = ReservaController;