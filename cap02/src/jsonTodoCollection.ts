// importa as classes necessárias do módulo correspondente
import { TodoItem } from "./todoItem.js";
import { TodoCollection } from "./todoCollection.js";
import { LowSync } from "lowdb";  // importa LowSync para interação com o banco de dados
import { JSONFileSync } from "lowdb/node";

// define o tipo do esquema esperado pelo banco de dados
type schemaType = {
  tasks: {
    id: number;
    task: string;
    complete: boolean;
  }[];
};

// classe que estende a classe TodoCollection e implementa armazenamento persistente usando o LowDB
export class JsonTodoCollection extends TodoCollection {
  private database: LowSync<schemaType>;

  // o construtor aceita um nome de usuário e uma lista opcional de itens de tarefa
  constructor(public userName: string, todoItems: TodoItem[] = []) {
    // chama o construtor da classe pai (TodoCollection) com um nome de usuário e uma lista vazia de itens de tarefa
    super(userName, []);

    // inicializa o banco de dados LowDB com um arquivo JSON
    this.database = new LowSync(new JSONFileSync("Todos.json"));
    // lê os dados do banco de dados
    this.database.read;

    // se o banco de dados não contiver dados, inicializa-o com as tarefas fornecidas
    if (this.database.data == null) {
      this.database.data = { tasks: todoItems };
      this.database.write();
      // adiciona as tarefas ao mapa de itens da coleção
      todoItems.forEach((item) => this.itemMap.set(item.id, item));
    } else {
      // se o banco de dados contiver dados, inicializa o mapa de itens com base nos dados do banco de dados
      this.database.data.tasks.forEach((item) =>
        this.itemMap.set(
          item.id,
          new TodoItem(item.id, item.task, item.complete)
        )
      );
    }
  }

  // sobrescreve o método addTodo da classe pai para armazenar as tarefas após adicionar uma nova tarefa
  addTodo(task: string): number {
    let result = super.addTodo(task);
    this.storeTasks();  // chama o método privado para armazenar as tarefas
    return result;
  }

  // sobrescreve o método markComplete da classe pai para armazenar as tarefas após marcar uma tarefa como concluída
  markComplete(id: number, complete: boolean): void {
    super.markComplete(id, complete);
    this.storeTasks();  // chama o método privado para armazenar as tarefas
  }

  // sobrescreve o método removeComplete da classe pai para armazenar as tarefas após remover as tarefas concluídas
  removeComplete(): void {
    super.removeComplete();
    this.storeTasks();  // chama o método privado para armazenar as tarefas
  }

  // método privado para armazenar as tarefas no banco de dados
  private storeTasks() {
    // verifica se o banco de dados e os dados existem
    if (this.database && this.database.data) {
      // atualiza os dados do banco de dados com os valores do mapa de itens
      this.database.data.tasks = [...this.itemMap.values()];
      // grava os dados atualizados no banco de dados
      this.database.write();
    }
  }
}
