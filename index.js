const { select } = require("@inquirer/prompts"); // abrir uma caixinha de seleção

// Interromper loop infinito: CTRL + C
const start = async () => {
  while (true) {
    //sempre que eu executar o comando await
    //devo colocar a palavra ASYNC na arrow fuction
    //o comando await é utilizado para fazer o programa esperar que o user digite
    const opcao = await select({
      //a funcção select está esperando um objeto que tenha os atributos
      //message e choices, esse objeto não pode pode receber nomes alternativos...
      //choices precisa ser um array
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar meta",
          value: "cadastrar",
        },
        {
          name: "Listar metas",
          value: "listar",
        },
        {
          name: "Sair",
          value: "sair",
        },
      ],
    });

    switch (opcao) {
      case "cadastrar":
        console.log("vamos cadastrar");
        break;
      case "listar":
        console.log("vamos listar");
        break;
      case "sair":
        console.log("Até a próxima!");
        return; // dentro da função start ele para a função
    }
  }
};

start();
