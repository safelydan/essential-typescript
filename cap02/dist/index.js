"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// importando as classes necessárias do módulo correspondente
const todoItem_1 = require("./todoItem");
const todoCollection_1 = require("./todoCollection");
// criando uma lista de instâncias da classe TodoItem
let todos = [
    new todoItem_1.TodoItem(1, "comprar flores"),
    new todoItem_1.TodoItem(2, "comprar sapatos"),
    new todoItem_1.TodoItem(3, "retirar ingressos", true),
    new todoItem_1.TodoItem(4, "ligar para joy")
];
// criando uma instância da classe TodoCollection
let collection = new todoCollection_1.TodoCollection("daniel", todos);
console.clear();
console.log(`lista de tarefas de ${collection.userName}`);
collection.getTodoItems(true).forEach(item => item.printDetails());
