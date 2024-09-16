const { select, input, checkbox } = require("@inquirer/prompts"); // abrir uma caixinha de seleção
const fs = require("fs").promises;

let mensagem = "Bem vindo ao App de Metas";

// let meta = {
//   value: "Tomar 3L de água por dia",
//   checked: false,
// };

// let metas = []; Posso declarar a list assim, sem nada entrer os colchetes
// let metas = [meta];
let metas;

const carregarMetas = async () => {
  try {
    const dados = await fs.readFile("metas.json", "utf-8");
    metas = JSON.parse(dados);
  } catch (erro) {
    metas = [];
  }
};

const salvarMetas = async () => {
  await fs.writeFile("metas.json", JSON.stringify(metas, null, 2));
};

const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite a meta:" });

  if (meta.length == 0) {
    mensagem = "A meta não pode ser vazia.";
    return;
    //Se quisesse que ficasse preso na função até digitar: return cadastrarMeta(); Ou seja,
    //returna para a própria função
  }

  metas.push(
    { value: meta, checked: false } //como ainda não terminei a meta, so estou cadastrando, crio como false
  );

  mensagem = "Meta cadastrada com sucesso";
};

const listarMetas = async () => {
  if (metas.length == 0) {
    mensagem = "Não existem metas";
    return;
  }

  const respostas = await checkbox({
    message:
      "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
    choices: [...metas], //spread operator ta pegando tudo que existe em metas e colocando em choices
    instructions: false,
  }); //Insere em resposta a meta selecionada

  //deflaga todas as metas
  //Isso é necessário porque se em algum momento o user flagar todas as metas, não teremos nenhum momento para desflgar
  //então desflagamos todas e voltamos a flagar apenas as que persistirem em respostas após o Listar do user.
  metas.forEach((m) => {
    m.checked = false;
  });

  if (respostas.length == 0) {
    mensagem = "Nenhuma meta selecionada";
    return;
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta;
    });
    meta.checked = true; // marca com true a meta que foi encontrada dentro de respostas
  });

  mensagem = "Meta(s) marcada(s) como concluída(s)";
};

const metasRealizadas = async () => {
  if (metas.length == 0) {
    mensagem = "Não existem metas";
    return;
  }

  //Filter mais uma função de array
  const realizadas = metas.filter((meta) => {
    // return true -> Sempre que o return for verdadeiro ele pega o item da
    // lista e coloca na nova lista, neste caso, meta, item da lista metas, se verdadeiro, será
    // inserido dentro de realizadas
    return meta.checked;
  });

  if (realizadas.length == 0) {
    mensagem = "Não existem metas realizadas! :(";
    return;
  }
  //A func abaixo basicamente formata a saida para uma lista de metas
  //possiveis serem selecionas... como as opções da tela de seleção inicial
  await select({
    message: "Metas Realizadas:" + realizadas.length,
    choices: [...realizadas],
  });
};

const metasAbertas = async () => {
  if (metas.length == 0) {
    mensagem = "Não existem metas";
    return;
  }

  const abertas = metas.filter((meta) => {
    return !meta.checked;
  });

  if (abertas.length == 0) {
    mensagem = "Não existem metas abertas! :)";
    return;
  }

  await select({
    message: "Metas Abertas:" + abertas.length,
    choices: [...abertas],
  });
};

const deletarMetas = async () => {
  if (metas.length == 0) {
    mensagem = "Não existem metas";
    return;
  }

  //map devolve o mesmo array só que modificado
  const metasDesmarcadas = metas.map((meta) => {
    return { value: meta.value, checked: false };
  }); //basicamente to copiando todo mundo para metasDesmarcadas alterando o valor de todos os itens para false no checked

  const itemADeletar = await checkbox({
    message: "Selecione item para deletar",
    choices: [...metasDesmarcadas], //spread operator ta pegando tudo que existe em metas e colocando em choices
    instructions: false,
  }); //Insere em resposta a meta selecionada

  if (itemADeletar.length == 0) {
    mensagem = "Nenhum item para deletar";
    return;
  }

  itemADeletar.forEach((item) => {
    metas = metas.filter((meta) => {
      return meta.value != item;
    });
  });
  mensagem = "Metas(s) deletada(s) com sucesso!";
};

const mostrarMensagem = () => {
  console.clear();
  if (mensagem != "") {
    console.log(mensagem);
    console.log();
    mensagem = "";
  }
};

// Interromper loop infinito: CTRL + C
const start = async () => {
  await carregarMetas();
  while (true) {
    mostrarMensagem();
    await salvarMetas();
    //sempre que eu executar o comando await
    //devo colocar a palavra ASYNC na arrow fuction
    //o comando await é utilizado para fazer o programa esperar que o user digite
    const opcao = await select({
      //A função await está associada a promises, a ideia de que irá buscar
      //algo e retornarar, mesmo se a resposta da promessa for negativa
      //A funcção select está esperando um objeto que tenha os atributos
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
          name: "Listar realizadas",
          value: "realizadas",
        },
        {
          name: "Metas abertas",
          value: "abertas",
        },
        {
          name: "Deletar metas",
          value: "deletar",
        },
        {
          name: "Sair",
          value: "sair",
        },
      ],
    });

    switch (opcao) {
      case "cadastrar":
        await cadastrarMeta(); //o await faz com que ele espere o retorno da função async
        break;
      case "listar":
        await listarMetas();
        break;
      case "realizadas":
        await metasRealizadas();
        break;
      case "abertas":
        await metasAbertas();
        break;
      case "deletar":
        await deletarMetas();
        break;
      case "sair":
        console.log("Até a próxima!");
        return; // dentro da função start ele para a função
    }
  }
};

start();
