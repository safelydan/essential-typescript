"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// importando as classes necessárias do módulo correspondente
const todoItem_1 = require("./todoItem");
const todoCollection_1 = require("./todoCollection");
// criando uma lista de instâncias da classe TodoItem
let todos = [
    new todoItem_1.TodoItem(1, "Comprar Flores"),
    new todoItem_1.TodoItem(2, "Comprar Sapatos"),
    new todoItem_1.TodoItem(3, "Retirar Ingressos"),
    new todoItem_1.TodoItem(4, "Ligar para Joe", true)
];
// criando uma instância da classe TodoCollection
let collection = new todoCollection_1.TodoCollection("Adam", todos);
// limpando a tela do console
console.clear();
// exibindo o nome do usuário e a mensagem
console.log(`Lista de Tarefas de ${collection.userName}`);
// adicionando uma nova tarefa e obtendo sua instância
let newId = collection.addTodo("Fazer uma corrida");
let todoItem = collection.getTodoById(newId);
// verificando se a tarefa foi encontrada antes de imprimir seus detalhes
todoItem?.printDetails();
