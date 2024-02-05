<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import type { TodoIdResponse } from '~/infra/http/api/todos/[id]/index.get';
import type { TodosResponse } from '~/infra/http/api/todos/index.get';

const route = useRoute();
const router = useRouter();
const app = useNuxtApp();

const previousCachedTodos = ref<TodosResponse>();
const { data: cachedTodos } = useNuxtData<TodosResponse>('todos');
const defaultTodo = computed(() =>
  cachedTodos.value?.todos.find((todo) => todo.id === route.params.id),
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

async function deleteTodo() {
  await $fetch(`/api/todos/${route.params.id}`, {
    method: 'DELETE',
    async onResponse() {
      if (!cachedTodos.value) return;

      cachedTodos.value.todos = cachedTodos.value.todos.filter(
        (todo) => todo.id !== route.params.id,
      );

      await refreshNuxtData('todos');
      app.payload.data.todos = undefined;
    },
  });

  await router.push('/');
}

async function toggleTodo() {
  await $fetch(`/api/todos/${route.params.id}`, {
    method: 'PATCH',
    onRequest() {
      if (cachedTodos.value) {
        previousCachedTodos.value = { ...cachedTodos.value };
      }

      if (data.value.todo) {
        data.value.todo.isCompleted = !data.value.todo.isCompleted;
      }

      const cachedTodo = cachedTodos.value?.todos.find(
        (todo) => todo.id === route.params.id,
      );
      if (cachedTodo) {
        cachedTodo.isCompleted = !cachedTodo.isCompleted;
      }
    },
    onRequestError() {
      if (!previousCachedTodos.value) return;
      cachedTodos.value = previousCachedTodos.value;
    },
    async onResponse() {
      await refreshNuxtData('todos');
      app.payload.data.todos = undefined;
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

      <UiCheckbox :checked="data.todo?.isCompleted" mr-2 @click="toggleTodo" />

      <h2
        pb-0
        :class="{ 'line-through text-3xl text-muted': data.todo?.isCompleted }"
      >
        {{ data.todo?.title }}
      </h2>
    </div>

    <UiButton variant="destructive" size="icon" @click="deleteTodo">
      <div i-mdi:delete />
    </UiButton>
  </div>

  <div v-if="data?.todo?.description">
    <UiSeparator my-4 />
    <p>{{ data.todo.description }}</p>
  </div>
</template>
