## https://docs.google.com/document/d/1X5q9yyYQaumqnOcEyy0VcpSbBK4wEpXBiJwVd5I6Qt8/edit

// //Comentário
// //Console é objeto -> Se refere numa semântica ao terminal
// //log() é função do objeto log
// console.log("hello world");
// //mensagem é uma variável
// //O tipo "let" permite que a variável seja alterada ao longo do programa
// //Já o tipo "const" não permite -> TypeError
// let mensagem = "Hello world";
// console.log(mensagem);
// mensagem = 2;
// console.log(mensagem);

// //Escopo
// const mensagem2 = "teste"; //Variável Global

// {
// const mensagem2 = "teste2"; // Variável Local
// console.log(mensagem2);
// }

// console.log(mensagem2);

// -- Keyboard Shortcuts --

// Comment multiples lines
// Add comment Line CTRL + K -> CTRL + C
// Remove comment Line CTRL + K -> CTRL + U

// arrays, objetos
// let metas = ["philipe", "alo", 2];

// console.log(metas[0]);
// console.log(metas[0] + metas[1]); // concatenação
// console.log(metas[1] + " " + metas[0]);
// console.log(metas[1] + " " + metas[0] + " " + metas[2] + " " + metas[3]);

// Objeto
// Todo objeto tem uma propriedade e um valor
// let meta = {
// value: "ler um livro por mês", // poderia ter outros nomes, não necessáriamente
// checked: false, // value e checked
// address: 2,
// };

// console.log(meta.value);

// function
// function e método são a mesma coisa, contudo,
// o método está atrelado, "dentro", de um objeto

//Arrow function () => {}
// Estamos atribuindo a constante criarMeta a arrow function, "retorno da AF"
// const criarMeta = () => {};

//ou

//Named function
//Estamos criando uma função chamada criarMeta
//function criarMeta() {}

//Agora, se temos a atribuição de uma arrow function dentro de um objeto
//então temos um método

// let meta2 = {
// value: "ler um livro por mês",
// checked: false,
// isChecked: (info) => {
// // método recebe um argumento/parâmetro chamado info
// console.log(meta2.checked);
// },
// };

// meta2.isChecked();
// meta2.value = "não é mais ler um livro";

// let meta = {
// value: "ler um livro por mês",
// checked: false,
// };

// let metas = [
// meta,
// {
// value: "caminhar 20 minutos todos os dias",
// checked: false,
// },
// ];

// console.log(metas[0].value);
// console.log(metas[1].value);

Métodos de array: Push, [find, forEach, filter] : HOF (Higher Order Functions)

spread and rest operator
