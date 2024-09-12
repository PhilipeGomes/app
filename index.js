//Comentário
//Console é objeto -> Se refere numa semântica ao terminal
//log() é função do objeto log
console.log("hello world");
//mensagem é uma variável
//O tipo "let" permite que a variável seja alterada ao longo do programa
//Já o tipo "const" não permite -> TypeError
let mensagem = "Hello world";
console.log(mensagem);
mensagem = 2;
console.log(mensagem);

//Escopo
const mensagem2 = "teste"; //Variável Global

{
  const mensagem2 = "teste2"; // Variável Local
  console.log(mensagem2);
}

console.log(mensagem2);
