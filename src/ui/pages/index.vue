<script setup lang="ts">
import type { Todo } from '~/app/entities/todo';
import type {
  MultipleTodosResponse,
  SingleTodoResponse,
} from '~/infra/http/view-models/todo';
import { API } from '~/ui/lib/api';

const app = useNuxtApp();

const { data } = useFetch<MultipleTodosResponse>('/api/todos', {
  key: 'todos',
  getCachedData: (key) => app.payload.data[key],
  default: () => ({ todos: [] }),
});

async function deleteTodo(id: Todo['id']) {
  await API.fetch(`/api/todos/${id}`, {
    method: 'DELETE',
    originalData: data,
    revalidateKey: 'todos',
    optimisticUpdate() {
      data.value.todos = data.value.todos.filter((todo) => todo.id !== id);
    },
  });
}

async function toggleTodo(id: Todo['id']) {
  if (!data.value?.todos) return;

  const todo = data.value.todos.find((todo) => todo.id === id);
  if (!todo) return;

  const { todo: newTodo } = await API.patch<
    MultipleTodosResponse,
    SingleTodoResponse
  >(`/api/todos/${id}`, {
    body: { isCompleted: !todo.isCompleted },
    originalData: data,
    optimisticUpdate() {
      todo.isCompleted = !todo.isCompleted;
    },
  });
  if (!newTodo) return;

  app.payload.data[`todo-${id}`] = { todo: newTodo };
  const newTodos = data.value.todos.map((todo) =>
    todo.id === id ? newTodo : todo,
  );
  app.payload.data.todos = {
    todos: newTodos,
  };
}
</script>

<template>
  <UiTable>
    <UiTableHeader>
      <UiTableRow>
        <UiTableHead w="50px" />
        <UiTableHead>Title</UiTableHead>
        <UiTableHead>Description</UiTableHead>
        <UiTableHead text-right>Actions</UiTableHead>
      </UiTableRow>
    </UiTableHeader>

    <UiTableBody>
      <UiTableRow v-if="!data?.todos.length">
        <UiTableCell :colspan="4">
          <p text="muted center" py-20>No todos found.</p>
        </UiTableCell>
      </UiTableRow>

      <UiTableRow v-for="todo in data?.todos" :key="todo.id" data-testid="todo">
        <UiTableCell>
          <UiCheckbox
            :checked="todo.isCompleted"
            @click="toggleTodo(todo.id)"
          />
        </UiTableCell>
        <UiTableCell>
          <UiButton
            variant="link"
            class="px-0 w-full h-full text-left"
            :class="{ 'line-through': todo.isCompleted }"
          >
            <NuxtLink :to="`/todo/${todo.id}`" block w-full h-full>
              {{ todo.title }}
            </NuxtLink>
          </UiButton>
        </UiTableCell>
        <UiTableCell>
          <NuxtLink :to="`/todo/${todo.id}`" block w-full h-full>
            <p whitespace-pre line-clamp-2>
              {{ todo.description?.trim() || '-' }}
            </p>
          </NuxtLink>
        </UiTableCell>
        <UiTableCell text-right>
          <NuxtLink :to="`/todo/${todo.id}`" block w-full h-full>
            <UiButton
              variant="destructive"
              size="icon"
              @click.prevent.stop="deleteTodo(todo.id)"
            >
              <div i-mdi:delete></div>
            </UiButton>
          </NuxtLink>
        </UiTableCell>
      </UiTableRow>
    </UiTableBody>
  </UiTable>
</template>
