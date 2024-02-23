// importa a classe TodoItem do módulo "todoItem"
import { TodoItem } from "./todoItem.js";

type ItemCounts = {
  total: number;
  incomplete: number;
};

// declaração da classe TodoCollection
export class TodoCollection {
  // propriedade privada nextId, iniciada com o valor 1
  private nextId: number = 1;
  // mapa que armazena objetos TodoItem, onde a chave é o ID e o valor é a tarefa
  private itemMap = new Map<number, TodoItem>();

  // construtor da classe TodoCollection, recebe um nome de usuário e uma array opcional de ToDoItems
  constructor(public userName: string, public toDoItems: TodoItem[] = []) {
    // para cada item na array fornecida, adiciona ao itemMap usando o ID como chave
    toDoItems.forEach((item) => this.itemMap.set(item.id, item));
    // inicializa a propriedade userName com o valor fornecido
    // inicializa a propriedade toDoItems com a array fornecida ou uma array vazia se não fornecida
  }

  // método para adicionar uma nova tarefa à coleção, recebe uma descrição da tarefa e retorna o ID atribuído
  addTodo(task: string): number {
    // enquanto houver uma tarefa com o ID atual, incrementa o ID
    while (this.getTodoById(this.nextId)) {
      this.nextId++;
    }

    // cria uma nova instância de TodoItem e adiciona ao itemMap
    this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));

    // retorna o ID atribuído à nova tarefa
    return this.nextId;
  }

  // método para obter tarefas da coleção, opcionalmente filtradas para incluir ou excluir tarefas concluídas
  getTodoItems(includeComplete: boolean): TodoItem[] {
    // retorna um array contendo os valores do itemMap (objetos TodoItem)
    // filtra o array com base no parâmetro includeComplete
    return [...this.itemMap.values()].filter(
      (item) => includeComplete || !item.complete
    );
  }

  //a expressão [...this.itemMap.values()] cria uma cópia de todos os valores do itemMap como um array, que é então filtrado de acordo com a condição
  //especificada antes de ser retornado pela função getTodoItems. isso permite que a função retorne uma lista de itens de tarefas pendentes
  //ou concluídas, dependendo do valor do parâmetro includeComplete

  // método para obter uma tarefa pelo ID, retorna a tarefa correspondente ou undefined se não encontrada
  getTodoById(id: number): TodoItem | undefined {
    return this.itemMap.get(id);
  }

  // método para marcar uma tarefa como completa ou não completa, recebe o ID da tarefa e o status de conclusão
  markComplete(id: number, complete: boolean): void {
    // obtém a tarefa pelo ID
    const toDoItem = this.getTodoById(id);

    // se a tarefa existe, atualiza o status de conclusão
    if (toDoItem) {
      toDoItem.complete = complete;
    }
  }
  removeComplete() {
    this.itemMap.forEach((item) => {
      if (item.complete) {
        this.itemMap.delete(item.id);
      }
    });
  }
  getItemCounts(): ItemCounts {
    return {
      total: this.itemMap.size,
      incomplete: this.getTodoItems(false).length,
    };
  }
}
