const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main(){
    //insere um usuário

    const novoUsuario = await prisma.usuario.create ({
    data: {
      nome:  "Brenda Vieira",
      email: "brendaVieira@gmail.com",
      password: "senha2711",
      tipo: "cliente",
      },
    });

    console.log("Novo usuário: " + JSON.stringify(novoUsuario));

    //Buscar usuários
    const usuarios = await prisma.usuario.findMany();
    console.log("Todos os usuários:"  + usuarios);
    console.log(usuarios);
    }

    main().catch((erro) => {
        console.log("Erro:" + erro);
    });
