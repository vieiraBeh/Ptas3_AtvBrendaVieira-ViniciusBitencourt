const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main(){
    //insere um usuário

    const novoUsuario = await prisma.usuario.create ({
    data: {
      nome:  "José Bonifácio",
      email: "jose.bonifacil@imperioptbr.com",
      },
    });

    console.log("novo usuário: " + JSON.stringify(novoUsuario));

    //Buscar usuários
    const usuarios = prisma.usuario.findMany();
    console.log("Todos os usuários:"  + usuarios);
    }

    main().catch((erro) => {
        console.log("Erro:" + erro);
    });
