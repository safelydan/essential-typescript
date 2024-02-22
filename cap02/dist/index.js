// importando as classes necessárias do módulo correspondente
import { TodoCollection } from "./todoCollection.js";
import { TodoItem } from "./todoItem.js";
// criando uma lista de instâncias da classe TodoItem
let todos = [
    new TodoItem(1, "comprar flores"),
    new TodoItem(2, "comprar sapatos"),
    new TodoItem(3, "retirar ingressos", true),
    new TodoItem(4, "ligar para joy")
];
// criando uma instância da classe TodoCollection
let collection = new TodoCollection("daniel", todos);
console.clear();
console.log(`lista de Tarefas de ${collection.userName}`);
collection.removeComplete();
collection.getTodoItems(true).forEach(item => item.printDetails());
