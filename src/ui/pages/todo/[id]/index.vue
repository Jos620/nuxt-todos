<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import type {
  MultipleTodosResponse,
  SingleTodoResponse,
} from '@/infra/http/dto/todos';
import { API } from '@/ui/lib/api';

const route = useRoute();
const router = useRouter();
const app = useNuxtApp();

const { data: cachedTodos } = useNuxtData<MultipleTodosResponse>('todos');
const defaultTodo = computed(() =>
  cachedTodos.value?.todos.find((todo) => todo.id === route.params.id),
);

const { data } = useLazyFetch<SingleTodoResponse>(
  `/api/todos/${route.params.id}`,
  {
    key: `todo-${route.params.id}`,
    immediate: !defaultTodo.value,
    default: () => ({
      todo: defaultTodo.value,
    }),
    getCachedData: (key) => app.payload.data[key],
  },
);

async function handleDeleteTodo() {
  await API.delete(`/api/todos/${route.params.id}`, {
    revalidateKey: 'todos',
    optimisticUpdate() {
      if (!cachedTodos.value) return;

      cachedTodos.value.todos = cachedTodos.value.todos.filter(
        (todo) => todo.id !== route.params.id,
      );
    },
    async onResponse() {
      await router.push('/');
    },
  });
}

async function handleTodoToggle() {
  const { todo } = await API.patch<SingleTodoResponse>(
    `/api/todos/${route.params.id}`,
    {
      revalidateKey: ['todos'],
      originalData: data,
      optimisticUpdate() {
        if (!data.value.todo) return;
        data.value.todo.isCompleted = !data.value.todo.isCompleted;
      },
    },
  );
  if (!todo) return;

  app.payload.data[`todo-${route.params.id}`] = { todo };
  data.value.todo = todo;
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

  <div v-if="data?.todo?.description?.trim()">
    <UiSeparator my-4 />
    <p whitespace-pre>{{ data.todo.description }}</p>
  </div>
</template>
