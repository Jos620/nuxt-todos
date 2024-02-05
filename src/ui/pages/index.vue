<script setup lang="ts">
import type { TodosResponse } from '~/infra/http/api/todos/index.get';

const app = useNuxtApp();

const { data } = useFetch<TodosResponse>('/api/todos', {
  key: 'todos',
  getCachedData: (key) => app.payload.data[key],
});
</script>

<template>
  <UiTable>
    <UiTableHeader>
      <UiTableRow>
        <UiTableHead>Title</UiTableHead>
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
      </UiTableRow>
    </UiTableBody>
  </UiTable>
</template>
