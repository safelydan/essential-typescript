// importando as classes necessárias do módulo correspondente
import { TodoCollection } from "./todoCollection.js";
import { TodoItem } from "./todoItem.js";
import inquirer from "inquirer";

// criando uma lista de instâncias da classe TodoItem
let todos: TodoItem[] = [
  new TodoItem(1, "comprar flores"),
  new TodoItem(2, "comprar sapatos"),
  new TodoItem(3, "retirar ingressos", true),
  new TodoItem(4, "ligar para joy"),
];

// criando uma instância da classe TodoCollection
let collection: TodoCollection = new TodoCollection("daniel", todos);

function displayTodoList(): void {
  console.log(
    `(${collection.userName} Todo List` +
      `(${collection.getItemCounts().incomplete} items to do)`
  );
  collection.getTodoItems(true).forEach((item) => item.printDetails());
}

enum Commands {
  Quit = "Quit",
}

function promptUser(): void {
  console.clear();
  displayTodoList();
  inquirer
    .prompt({
      type: "list",
      name: "command",
      message: "Choose option",
      choices: Object.values(Commands),
    })
    .then((answers) => {
      if (answers["commands"] !== Commands.Quit) {
        promptUser();
      }
    });
}

console.clear();
console.log(`lista de Tarefas de ${collection.userName}`);
collection.removeComplete();
promptUser();
