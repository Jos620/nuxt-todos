<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import type { SingleTodoResponse } from '@/infra/http/dto/todos';
import { API } from '@/ui/lib/api';
import { asArray } from '@/ui/lib/utils';

defineOptions({
  name: 'TodoPage',
});

const route = useRoute();
const router = useRouter();

const todosStore = useTodosStore();
const { cachedTodos } = storeToRefs(todosStore);

const { data } = useAsyncData<SingleTodoResponse>(async () => {
  const defaultTodo = cachedTodos.value[asArray(route.params.id)[0]];

  if (defaultTodo) {
    return {
      todo: defaultTodo,
    };
  }

  const response = await $fetch<SingleTodoResponse>(
    `/api/todos/${route.params.id}`,
  );

  if (!response.todo) {
    await router.push('/');
    throw showError('Todo not found');
  }

  cachedTodos.value[response.todo.id] = response.todo;

  return response;
});

async function handleDeleteTodo() {
  if (!data.value?.todo) return;

  router.push('/');
  await todosStore.deleteTodo(data.value.todo.id);
}

async function handleTodoToggle() {
  const { todo } = await API.patch<SingleTodoResponse>(
    `/api/todos/${route.params.id}`,
    {
      revalidateKey: ['todos'],
      originalData: data,
      optimisticUpdate() {
        if (!data.value?.todo) return;
        data.value.todo.isCompleted = !data.value.todo.isCompleted;
      },
    },
  );
  if (!todo) return;

  cachedTodos.value[todo.id] = todo;
}
</script>

<template>
  <div center justify-between>
    <div flex items-center gap-2>
      <NuxtLink to="/">
        <div i-mdi:chevron-left text="2xl muted hover:primary" />
      </NuxtLink>

      <UiCheckbox
        :checked="data?.todo?.isCompleted"
        @click="handleTodoToggle"
      />

      <h2
        pb-0
        ml-2
        :class="{ 'line-through text-3xl text-muted': data?.todo?.isCompleted }"
      >
        {{ data?.todo?.title }}
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
