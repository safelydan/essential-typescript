import { TodoItem } from "./todoItem";

// declaração da classe ToDoCollection
export class TodoCollection {
    // declaração da propriedade privada nextId, iniciada com o valor 1
    private nextId: number = 1;
    private itemMap = new Map<number, TodoItem>()

    // construtor da classe, que recebe um nome de usuário e uma array opcional de ToDoItems
    constructor(public userName: string, public toDoItems: TodoItem[] = []) {
        // inicializa a propriedade userName com o valor fornecido
        // inicializa a propriedade toDoItems com a array fornecida ou uma array vazia se não fornecida
    }

    // método para adicionar uma nova tarefa à coleção, recebe uma descrição da tarefa e retorna o ID atribuído
    addTodo(task: string): number {
        // enquanto houver uma tarefa com o ID atual, incrementa o ID
        while (this.getTodoById(this.nextId)) {
            this.nextId++;
        }

        // cria uma nova instância de ToDoItem e a adiciona à array toDoItems
        this.toDoItems.push(new TodoItem(this.nextId, task));

        // retorna o ID atribuído à nova tarefa
        return this.nextId;
    }

    // método para obter uma tarefa pelo ID, retorna a tarefa correspondente ou undefined se não encontrada
    getTodoById(id: number): TodoItem | undefined {
        return this.toDoItems.find(item => item.id === id);
    }

    // método para marcar uma tarefa como completa, recebe o ID da tarefa e um boolean indicando o status de conclusão
    markComplete(id: number, complete: boolean): void {
        // obtém a tarefa pelo ID
        const toDoItem = this.getTodoById(id);

        // se a tarefa existe, atualiza o status de conclusão
        if (toDoItem) {
            toDoItem.complete = complete;
        }
    }
}
