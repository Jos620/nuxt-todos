/* eslint-disable require-await */
import { Todo } from '../../src/app/entities/todo';
import type { TodosRepository } from '../../src/app/repositories/todo';

export const fakeTodos: string[][] = [
  ['Do the laundry', "Don't mix colors!"],
  ['Walk the dog'],
  ['Buy some milk', 'Remember to check the expiration date!'],
];

export class InMemoryDatabase implements TodosRepository {
  todos: Todo[] = [];

  withTodos(todos?: Todo[]): InMemoryDatabase {
    if (todos) {
      this.todos = todos;
      return this;
    }

    this.todos = fakeTodos.map(([title, description]) => {
      return new Todo({
        title,
        description,
      });
    });

    return this;
  }

  async getAllTodos(): Promise<Todo[]> {
    return this.todos.filter(Boolean);
  }

  async getTodoById(id: string): Promise<Todo> {
    const index = this.todos.findIndex((todo) => todo.id === id);
    return this.todos[index];
  }

  async createTodo(todo: Todo): Promise<void> {
    this.todos.push(todo);
  }

  async updateTodo(todo: Todo): Promise<void> {
    const index = this.todos.findIndex((t) => t.id === todo.id);
    this.todos[index] = todo;
  }

  async deleteTodoById(id: string): Promise<void> {
    const index = this.todos.findIndex((todo) => todo.id === id);
    delete this.todos[index];
  }
}
