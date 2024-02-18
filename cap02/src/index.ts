// importando as classes necessárias do módulo correspondente
import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";

// criando uma lista de instâncias da classe TodoItem
let todos: TodoItem[] = [
    new TodoItem(1, "Comprar Flores"),
    new TodoItem(2, "Comprar Sapatos"),
    new TodoItem(3, "Retirar Ingressos"),
    new TodoItem(4, "Ligar para Joe", true)
];

// criando uma instância da classe TodoCollection
let collection: TodoCollection = new TodoCollection("Adam", todos);

// limpando a tela do console
console.clear();

// exibindo o nome do usuário e a mensagem
console.log(`Lista de Tarefas de ${collection.userName}`);

// adicionando uma nova tarefa e obtendo sua instância
let newId: number = collection.addTodo("Fazer uma corrida");
let todoItem: TodoItem | undefined = collection.getTodoById(newId);

// verificando se a tarefa foi encontrada antes de imprimir seus detalhes
todoItem?.printDetails();


