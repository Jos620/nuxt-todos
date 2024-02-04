import type { Todo } from '../entities/todo';

export interface TodosRepository {
  getAllTodos(): Promise<Todo[]>;
  getTodoById(id: Todo['id']): Promise<Todo | undefined>;
  createTodo(todo: Todo): Promise<void>;
  updateTodo(todo: Todo): Promise<void>;
  deleteTodoById(id: Todo['id']): Promise<void>;
}
