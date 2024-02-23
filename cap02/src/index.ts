// importando as classes necessárias do módulo correspondente
import { TodoItem } from "./todoItem.js";
import { TodoCollection } from "./todoCollection.js";
import inquirer from "inquirer"

// criando uma lista de instâncias da classe TodoItem
let todos: TodoItem[] = [
    new TodoItem(1, "comprar flores"),
    new TodoItem(2, "comprar sapatos"),
    new TodoItem(3, "retirar ingressos"),
    new TodoItem(4, "ligar para joy", true)
];

// criando uma instância da classe TodoCollection
let collection: TodoCollection = new TodoCollection("daniel", todos);


console.clear();
console.log(`lista de Tarefas de ${collection.userName}`);
collection.removeComplete();
collection.getTodoItems(true).forEach(item => item.printDetails())


