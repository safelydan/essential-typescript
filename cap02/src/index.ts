// importando as classes necessárias do módulo correspondente
import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";

// criando uma lista de instâncias da classe TodoItem
let todos: TodoItem[] = [
    new TodoItem(1, "comprar Flores"),
    new TodoItem(2, "comprar Sapatos"),
    new TodoItem(3, "retirar Ingressos"),
    new TodoItem(4, "ligar para Joe", true)
];

// criando uma instância da classe TodoCollection
let collection: TodoCollection = new TodoCollection("daniel", todos);


console.clear();
console.log(`lista de Tarefas de ${collection.userName}`);
collection.getTodoItems(true).forEach(item => item.printDetails())


