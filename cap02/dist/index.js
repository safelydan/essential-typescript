// importando as classes necessárias do módulo correspondente
import { TodoItem } from "./todoItem.js";
import { TodoCollection } from "./todoCollection.js";
import inquirer from "inquirer";
// criando uma lista de instâncias da classe TodoItem
let todos = [
    new TodoItem(1, "Buy Flowers"),
    new TodoItem(2, "Get Shoes"),
    new TodoItem(3, "Collect Tickets"),
    new TodoItem(4, "Call Joe", true), // a flag 'true' indica que esta tarefa está concluída
];
// criando uma instância da classe TodoCollection
let collection = new TodoCollection("Adam", todos);
let showCompleted = true;
// função para exibir a lista de tarefas no console
function displayTodoList() {
    console.log(`${collection.userName}'s Todo List ` +
        `(${collection.getItemCounts().incomplete} items to do)`);
    // itera sobre as tarefas e imprime detalhes de cada uma
    collection.getTodoItems(true).forEach((item) => item.printDetails());
}
// enumeração para representar os comandos disponíveis
var Commands;
(function (Commands) {
    Commands["Toggle"] = "Show/Hide Completed";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
// função para interagir com o usuário e prompt para escolher opções
function promptUser() {
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
        // se o comando escolhido não for 'Quit', chama a função promptUser recursivamente
        switch (answers["command"]) {
            case Commands.Toggle:
                showCompleted = !showCompleted;
                promptUser();
                break;
        }
    });
}
// limpa o console, exibe a lista de tarefas e inicia a interação com o usuário
console.clear();
console.log(`lista de tarefas de ${collection.userName}`);
//collection.removeComplete();  // remove as tarefas concluídas antes de exibir
promptUser();
