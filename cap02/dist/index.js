// importa as classes necessárias do módulo correspondente
import { TodoItem } from "./todoItem.js";
import { TodoCollection } from "./todoCollection.js";
import inquirer from "inquirer";
// cria uma lista de instâncias da classe TodoItem
let todos = [
    new TodoItem(1, "buy flowers"),
    new TodoItem(2, "get shoes"),
    new TodoItem(3, "collect tickets"),
    new TodoItem(4, "call Joy")
];
// cria uma instância da classe TodoCollection
let collection = new TodoCollection("daniel", todos);
let showCompleted = true;
// função para exibir a lista de tarefas no console
function displayTodoList() {
    // imprime no console o nome do usuário seguido da frase "Lista de Tarefas" e do número de itens incompletos
    console.log(`${collection.userName}'s todo list` +
        `(${collection.getItemCounts().incomplete} itens to do)`);
    // imprime apenas os incompletos, se a opção de exibir completos estiver desativada
    collection.getTodoItems(showCompleted).forEach((item) => item.printDetails());
}
// enumeração para representar os comandos disponíveis
var Commands;
(function (Commands) {
    Commands["Add"] = "Add New Task";
    Commands["Complete"] = "Complete a Task";
    Commands["Toggle"] = "Show/Hide Completed";
    Commands["Purge"] = "Remove Completed Tasks";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
// função para adicionar uma nova tarefa
function promptAdd() {
    console.clear();
    inquirer
        .prompt({
        type: "input",
        name: "add",
        message: "Enter the task: ",
    })
        .then((answers) => {
        if (answers["add"] !== "") {
            collection.addTodo(answers["add"]);
        }
        promptUser();
    });
}
// função para marcar tarefas como concluídas
function promptComplete() {
    console.clear();
    inquirer
        .prompt({
        type: "checkbox",
        name: "complete",
        message: "Mark Tasks Complete",
        choices: collection.getTodoItems(showCompleted).map((item) => ({
            name: item.task,
            value: item.id,
            checked: item.complete,
        })),
    })
        .then((answers) => {
        let completedTasks = answers["complete"];
        collection.getTodoItems(true).forEach((item) => {
            collection.markComplete(item.id, completedTasks.find((id) => id === item.id) !== undefined);
        });
        promptUser();
    });
}
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
            case Commands.Add:
                promptAdd();
                break;
            case Commands.Complete:
                if (collection.getItemCounts().incomplete > 0) {
                    promptComplete();
                }
                else {
                    promptUser();
                }
                break;
            case Commands.Purge:
                collection.removeComplete();
                promptUser();
                break;
        }
    });
}
// limpa o console, exibe a lista de tarefas e inicia a interação com o usuário
console.clear();
console.log(`lista de tarefas de ${collection.userName}`);
// collection.removeComplete();  // remove as tarefas concluídas antes de exibir
promptUser();
