// importando as classes necessárias do módulo correspondente
import { TodoItem } from "./todoItem.js";
import { TodoCollection } from "./todoCollection.js";
import inquirer from "inquirer";
// criando uma lista de instâncias da classe TodoItem
let todos = [
    new TodoItem(1, "buy flowers"),
    new TodoItem(2, "get shoes"),
    new TodoItem(3, "collect tickets"),
    new TodoItem(4, "call Joy", true), // a flag 'true' indica que esta tarefa está concluída
];
// criando uma instância da classe TodoCollection
let collection = new TodoCollection("daniel", todos);
let showCompleted = true;
// função para exibir a lista de tarefas no console
function displayTodoList() {
    // imprime no console o nome do usuário seguido da frase "Lista de Tarefas" e do número de itens incompletos
    console.log(`${collection.userName}'s todo list` +
        `(${collection.getItemCounts().incomplete} itens to do)`);
    //imprime apenas apenas os incompletos, se a opção de exibir completos estiver desativada
    collection.getTodoItems(showCompleted).forEach((item) => item.printDetails());
}
// enumeração para representar os comandos disponíveis
var Commands;
(function (Commands) {
    Commands["Add"] = "Add New Task";
    Commands["Toggle"] = "Show/Hide Completed";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
function promptAdd() {
    console.clear();
    inquirer.prompt({
        type: "input",
        name: "add",
        message: "Enter the task: "
    }).then(answers => {
        if (answers["add"] !== "") {
            collection.addTodo(answers["add"]);
        }
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
        }
    });
}
// limpa o console, exibe a lista de tarefas e inicia a interação com o usuário
console.clear();
console.log(`lista de tarefas de ${collection.userName}`);
//collection.removeComplete();  // remove as tarefas concluídas antes de exibir
promptUser();
