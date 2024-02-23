// definição da classe todoitem
export class TodoItem {
    id;
    task;
    complete;
    // construtor da classe com parâmetros públicos (shortcut do TypeScript)
    constructor(id, task, complete = false) {
        this.id = id;
        this.task = task;
        this.complete = complete;
        // os parâmetros públicos no construtor automaticamente criam e inicializam as propriedades da classe
        // neste caso, cria as propriedades id, task e complete com os valores passados como parâmetros
    }
    // método para imprimir detalhes do item no console
    printDetails() {
        // utiliza uma string de formatação para imprimir os detalhes, adicionando "(completo)" se a tarefa estiver completa
        console.log(`${this.id}\t${this.task} ${this.complete ? "\t(completa)" : ""}`);
    }
}
// comentários explicativos adicionados abaixo:
// a classe ToDoitem representa um item em uma lista de tarefas.
// o construtor é uma forma concisa no TypeScript de criar e inicializar propriedades da classe.
// o parâmetro 'public' torna as propriedades acessíveis fora da classe, criando id, task e complete automaticamente.
// o valor padrão 'false' para 'complete' significa que, se não for fornecido, será assumido como 'false'.
// o método 'printDetails' imprime detalhes do item no console, indicando se a tarefa está completa ou não.
// fim dos comentários
