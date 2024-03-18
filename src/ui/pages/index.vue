<script setup lang="ts">
import type { Todo } from '~/app/entities/todo';
import type { TodosResponse } from '~/infra/http/api/todos/index.get';
import { API } from '~/ui/lib/api';

const app = useNuxtApp();

const { data } = useFetch<TodosResponse>('/api/todos', {
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

  await API.fetch(`/api/todos/${id}`, {
    method: 'PATCH',
    body: { isCompleted: !todo.isCompleted },
    originalData: data,
    revalidateKey: ['todos', `todo-${id}`],
    optimisticUpdate() {
      todo.isCompleted = !todo.isCompleted;
    },
  });
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

      <UiTableRow v-for="todo in data?.todos" :key="todo.id">
        <UiTableCell>
          <UiCheckbox
            :checked="todo.isCompleted"
            @click="toggleTodo(todo.id)"
          />
        </UiTableCell>
        <UiTableCell>
          <NuxtLink :to="`/todo/${todo.id}`">
            <UiButton
              variant="link"
              class="px-0"
              :class="{ 'line-through': todo.isCompleted }"
            >
              {{ todo.title }}
            </UiButton>
          </NuxtLink>
        </UiTableCell>
        <UiTableCell>
          <p>{{ todo.description || '-' }}</p>
        </UiTableCell>
        <UiTableCell text-right>
          <UiButton
            variant="destructive"
            size="icon"
            @click="deleteTodo(todo.id)"
          >
            <div i-mdi:delete></div>
          </UiButton>
        </UiTableCell>
      </UiTableRow>
    </UiTableBody>
  </UiTable>
</template>
../lib/api
