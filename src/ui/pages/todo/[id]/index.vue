<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import type { TodoIdResponse } from '~/infra/http/api/todos/[id]/index.get';
import type { TodoIdPatchResponse } from '~/infra/http/api/todos/[id]/index.patch';
import type { TodosResponse } from '~/infra/http/api/todos/index.get';

const route = useRoute();
const router = useRouter();
const app = useNuxtApp();

const { data: cachedTodos } = useNuxtData<TodosResponse>('todos');
const defaultTodo = computed(() =>
  cachedTodos.value?.todos.find((todo) => todo.id === route.params.id),
);

const { data } = useLazyFetch<TodoIdResponse>(`/api/todos/${route.params.id}`, {
  key: `todo-${route.params.id}`,
  immediate: !defaultTodo.value,
  default: () => ({
    todo: defaultTodo.value,
  }),
  getCachedData: (key) => app.payload.data[key],
});

async function handleDeleteTodo() {
  await $fetch(`/api/todos/${route.params.id}`, {
    method: 'DELETE',
    async onResponse() {
      if (cachedTodos.value) {
        cachedTodos.value.todos = cachedTodos.value.todos.filter(
          (todo) => todo.id !== route.params.id,
        );

        app.payload.data.todos = undefined;
        await refreshNuxtData('todos');
      }

      await router.push('/');
    },
  });
}

async function handleTodoToggle() {
  function toggleTodo() {
    if (!data.value.todo) return;
    data.value.todo.isCompleted = !data.value.todo.isCompleted;
  }

  await $fetch(`/api/todos/${route.params.id}`, {
    method: 'PATCH',
    onRequest: toggleTodo,
    onResponseError: toggleTodo,
    async onResponse({ response }) {
      app.payload.data.todos = undefined;
      await refreshNuxtData('todos');

      const updatedTodo = response._data as TodoIdPatchResponse;

      app.payload.data[`todo-${updatedTodo.todo?.id}`] = updatedTodo;
    },
  });
}
</script>

<template>
  <div center justify-between>
    <div flex items-center gap-2>
      <NuxtLink to="/">
        <div i-mdi:chevron-left text="2xl muted hover:primary" />
      </NuxtLink>

      <UiCheckbox :checked="data.todo?.isCompleted" @click="handleTodoToggle" />

      <h2
        pb-0
        ml-2
        :class="{ 'line-through text-3xl text-muted': data.todo?.isCompleted }"
      >
        {{ data.todo?.title }}
      </h2>
    </div>

    <UiButton variant="destructive" size="icon" @click="handleDeleteTodo">
      <div i-mdi:delete />
    </UiButton>
  </div>

  <div v-if="data?.todo?.description">
    <UiSeparator my-4 />
    <p>{{ data.todo.description }}</p>
  </div>
</template>
