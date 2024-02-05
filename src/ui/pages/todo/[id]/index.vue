<script setup lang="ts">
import { useRoute } from 'vue-router';

import type { TodoIdResponse } from '~/infra/http/api/todos/[id]/index.get';
import type { TodosResponse } from '~/infra/http/api/todos/index.get';

const route = useRoute();
const app = useNuxtApp();

const { data: cachedTodos } = useNuxtData<TodosResponse>('todos');
const defaultTodo = computed(
  () => cachedTodos.value?.todos.find((todo) => todo.id === route.params.id),
);

const { data } = useLazyFetch<TodoIdResponse>(`/api/todos/${route.params.id}`, {
  immediate: !defaultTodo.value,
  default() {
    return {
      todo: defaultTodo.value,
    };
  },
  getCachedData: (key) => app.payload.data[key],
});
</script>

<template>
  <main p="4 md:y-10 lg:y-20">
    <div container mx-auto>
      <div flex items-center gap-2>
        <NuxtLink to="/">
          <div i-mdi:chevron-left text="2xl muted hover:primary" />
        </NuxtLink>

        <h2 pb-0>{{ data?.todo?.title }}</h2>
      </div>

      <div v-if="data?.todo?.description">
        <UiSeparator my-4 />
        <p>{{ data?.todo.description }}</p>
      </div>
    </div>
  </main>
</template>