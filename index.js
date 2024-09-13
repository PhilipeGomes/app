// Interromper loop infinito: CTRL + C
const start = () => {
  while (true) {
    let opcao = "cadastrar";
    switch (opcao) {
      case "cadastra":
        console.log("vamos cadastrar");
        break;
      case "listar":
        console.log("vamos listar");
        break;
      case "sair":
        return;
    }
  }
};

start();
