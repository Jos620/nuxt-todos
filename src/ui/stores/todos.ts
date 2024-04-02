import {
  type SingleTodoResponse,
  singleTodoResponseSchema,
} from '@/infra/http/dto/todos';
import type { TodoHTTP } from '@/infra/http/view-models/todo';

import { API } from '../lib/api';

export type TodosCache = Record<TodoHTTP['id'], TodoHTTP>;

export const useTodosStore = defineStore('todos', () => {
  const cachedTodos = ref<TodosCache>();

  async function deleteTodo(id: TodoHTTP['id']) {
    await API.delete(`/api/todos/${id}`, {
      originalData: cachedTodos,
      optimisticUpdate() {
        delete cachedTodos.value?.[id];
      },
    });

    return cachedTodos.value;
  }

  async function toggleTodo(id: TodoHTTP['id']) {
    if (!cachedTodos.value) return;

    const todo = cachedTodos.value[id];
    if (!todo) return;

    return await API.patch<SingleTodoResponse>(`/api/todos/${id}`, {
      body: { isCompleted: !todo.isCompleted },
      originalData: cachedTodos,
      optimisticUpdate() {
        todo.isCompleted = !todo.isCompleted;
      },
      onResponse({ response }) {
        if (!cachedTodos.value) return;

        const { todo } = singleTodoResponseSchema.parse(response._data);
        if (!todo) return;

        cachedTodos.value[todo.id] = todo;
      },
    });
  }

  return {
    cachedTodos,
    deleteTodo,
    toggleTodo,
  };
});
