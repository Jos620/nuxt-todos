<script setup lang="ts">
import type { Todo } from '~/app/entities/todo';
import type { TodosResponse } from '~/infra/http/api/todos/index.get';

const app = useNuxtApp();

const previousData = ref<TodosResponse>();
const { data } = useFetch<TodosResponse>('/api/todos', {
  key: 'todos',
  getCachedData: (key) => app.payload.data[key],
  default: () => ({ todos: [] }),
});

async function deleteTodo(id: Todo['id']) {
  if (!data.value?.todos) return;

  await $fetch(`/api/todos/${id}`, {
    method: 'DELETE',
    onRequest() {
      previousData.value = { ...data.value };
      data.value.todos = data.value.todos.filter((todo) => todo.id !== id);
    },
    onRequestError() {
      if (!previousData.value) return;
      data.value = previousData.value;
    },
    async onResponse() {
      await refreshNuxtData('todos');
      app.payload.data.todos = undefined;
    },
  });
}
</script>

<template>
  <UiTable>
    <UiTableHeader>
      <UiTableRow>
        <UiTableHead>Title</UiTableHead>
        <UiTableHead text-right>Actions</UiTableHead>
      </UiTableRow>
    </UiTableHeader>

    <UiTableBody>
      <UiTableRow v-for="todo in data?.todos" :key="todo.id">
        <UiTableCell>
          <NuxtLink :to="`/todo/${todo.id}`">
            <UiButton variant="link" class="px-0">
              {{ todo.title }}
            </UiButton>
          </NuxtLink>
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
