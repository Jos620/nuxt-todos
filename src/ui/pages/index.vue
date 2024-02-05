<script setup lang="ts">
import type { TodosResponse } from '~/infra/http/api/todos/index.get';

const app = useNuxtApp();

const { data } = useFetch<TodosResponse>('/api/todos', {
  key: 'todos',
  getCachedData: (key) => app.payload.data[key],
});
</script>

<template>
  <main p="4 md:y-10 lg:y-20">
    <div container mx-auto>
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
                {{ todo.title }}
              </NuxtLink>
            </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>
  </main>
</template>
