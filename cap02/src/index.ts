// importa as classes necessárias do módulo correspondente
import { TodoItem } from "./todoItem.js";
import { TodoCollection } from "./todoCollection.js";
import inquirer from "inquirer";
import { JsonTodoCollection } from "./jsonTodoCollection.js";

// cria uma lista de instâncias da classe TodoItem
let todos: TodoItem[] = [
  new TodoItem(1, "buy flowers"),
  new TodoItem(2, "get shoes"),
  new TodoItem(3, "collect tickets"),
  new TodoItem(4, "call Joy")
];

// cria uma instância da classe TodoCollection
let collection: TodoCollection = new JsonTodoCollection("daniel", todos);
let showCompleted = true;

// função para exibir a lista de tarefas no console
function displayTodoList(): void {
  // imprime no console o nome do usuário seguido da frase "Lista de Tarefas" e do número de itens incompletos
  console.log(
    `${collection.userName}'s todo list` +
      `(${collection.getItemCounts().incomplete} itens to do)`
  );
  // imprime apenas os incompletos, se a opção de exibir completos estiver desativada
  collection.getTodoItems(showCompleted).forEach((item) => item.printDetails());
}

// enumeração para representar os comandos disponíveis
enum Commands {
  Add = "Add New Task",
  Complete = "Complete a Task",
  Toggle = "Show/Hide Completed",
  Purge = "Remove Completed Tasks",
  Quit = "Quit",
}

// função para adicionar uma nova tarefa
function promptAdd(): void {
  console.clear();
  // utiliza o inquirer para obter uma entrada do usuário
  inquirer
    .prompt({
      type: "input",
      name: "add",
      message: "Enter the task: ",
    })
    .then((answers) => {
      // verifica se a entrada não está vazia antes de adicionar a tarefa
      if (answers["add"] !== "") {
        collection.addTodo(answers["add"]);
      }
      // chama a função para apresentar as opções novamente
      promptUser();
    });
}

// função para marcar tarefas como concluídas
function promptComplete(): void {
  console.clear();
  // utiliza o inquirer para obter escolhas de tarefas a serem marcadas como concluídas
  inquirer
    .prompt({
      type: "checkbox",
      name: "complete",
      message: "Mark Tasks Complete",
      // cria as opções de escolha com base nas tarefas disponíveis
      choices: collection.getTodoItems(showCompleted).map((item) => ({
        name: item.task,
        value: item.id,
        checked: item.complete,
      })),
    })
    .then((answers) => {
      let completedTasks = answers["complete"] as number[];
      // itera sobre as tarefas completas e marca-as na coleção
      collection.getTodoItems(true).forEach((item) => {
        collection.markComplete(
          item.id,
          completedTasks.find((id) => id === item.id) !== undefined
        );
      });
      // chama a função para apresentar as opções novamente
      promptUser();
    });
}

// função para interagir com o usuário e prompt para escolher opções
function promptUser(): void {
  console.clear();
  // chama a função para exibir a lista de tarefas
  displayTodoList();
  // utiliza o inquirer para obter a escolha do usuário entre as opções definidas na enumeração Commands
  inquirer
    .prompt({
      type: "list",
      name: "command",
      message: "Choose option",
      // usa os valores da enumeração como opções
      choices: Object.values(Commands),
    })
    .then((answers) => {
      // avalia a escolha do usuário e executa a ação correspondente
      switch (answers["command"]) {
        case Commands.Toggle:
          // inverte o valor de showCompleted e chama a função promptUser novamente
          showCompleted = !showCompleted;
          promptUser();
          break;
        case Commands.Add:
          // chama a função para adicionar uma nova tarefa
          promptAdd();
          break;

        case Commands.Complete:
          // verifica se há tarefas incompletas antes de chamar a função para marcar tarefas como concluídas
          if (collection.getItemCounts().incomplete > 0) {
            promptComplete();
          } else {
            // se não houver tarefas incompletas, chama a função para apresentar as opções novamente
            promptUser();
          }
          break;

        case Commands.Purge:
          // remove as tarefas concluídas e chama a função para apresentar as opções novamente
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
