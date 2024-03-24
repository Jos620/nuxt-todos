<script setup lang="ts">
import type { MultipleTodosResponse } from '~/infra/http/dto/todos';

import type { TodosCache } from '../stores/todos';

defineOptions({
  name: 'HomePage',
});

const todosStore = useTodosStore();
const { cachedTodos } = storeToRefs(todosStore);

const todoList = computed(() => Object.values(cachedTodos.value));

const { data } = useAsyncData<MultipleTodosResponse>(
  async () => {
    if (todoList.value) {
      return {
        todos: todoList.value,
      };
    }

    const response = await $fetch<MultipleTodosResponse>('/api/todos');
    cachedTodos.value = response.todos.reduce((acc, todo) => {
      acc[todo.id] = todo;
      return acc;
    }, {} as TodosCache);

    return response;
  },
  {
    watch: [todoList],
    default: () => ({ todos: [] }),
  },
);
</script>

<template>
  <UiTable class="table table-fixed">
    <UiTableHeader>
      <UiTableRow>
        <UiTableHead v-if="data.todos.length > 0" w="50px" />
        <UiTableHead class="lg:hidden" w="100%">Todo</UiTableHead>
        <UiTableHead class="<lg:hidden">Title</UiTableHead>
        <UiTableHead class="<lg:hidden">Description</UiTableHead>
        <UiTableHead text-right w="100px">Actions</UiTableHead>
      </UiTableRow>
    </UiTableHeader>

    <UiTableBody>
      <UiTableRow v-if="!data.todos.length">
        <UiTableCell :colspan="4">
          <div center>
            <p text="muted" py-20>
              Nothing left to do! <br />

              <span class="<lg:hidden">
                Hit
                <UiKBD variant="secondary" size="small">/</UiKBD>
                to create a new todo.
              </span>
            </p>
          </div>
        </UiTableCell>
      </UiTableRow>

      <UiTableRow v-for="todo in data.todos" :key="todo.id" data-testid="todo">
        <UiTableCell>
          <UiCheckbox
            :checked="todo.isCompleted"
            @click="todosStore.toggleTodo(todo.id)"
          />
        </UiTableCell>
        <UiTableCell>
          <UiButton
            variant="link"
            class="px-0 w-full h-full text-left"
            :class="{ 'line-through': todo.isCompleted }"
          >
            <NuxtLink :to="`/todo/${todo.id}`" col gap-1 w-full h-full>
              <p>{{ todo.title }}</p>
              <p
                v-if="todo.description"
                whitespace-pre-line
                break-words
                line-clamp-2
                max-w-full
                text-muted
                lg="hidden"
              >
                {{ todo.description }}
              </p>
            </NuxtLink>
          </UiButton>
        </UiTableCell>
        <UiTableCell class="<lg:hidden">
          <NuxtLink :to="`/todo/${todo.id}`" block w-full h-full>
            <p whitespace-pre-line break-words line-clamp-2 max-w-full>
              {{ todo.description || '-' }}
            </p>
          </NuxtLink>
        </UiTableCell>
        <UiTableCell text-right>
          <NuxtLink :to="`/todo/${todo.id}`" block w-full h-full>
            <UiButton
              variant="destructive"
              size="icon"
              @click.prevent.stop="todosStore.deleteTodo(todo.id)"
            >
              <div i-mdi:delete></div>
            </UiButton>
          </NuxtLink>
        </UiTableCell>
      </UiTableRow>
    </UiTableBody>
  </UiTable>
</template>
