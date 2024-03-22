<script setup lang="ts">
import type { Todo } from '~/app/entities/todo';
import type {
  MultipleTodosResponse,
  SingleTodoResponse,
} from '~/infra/http/dto/todos';
import { singleTodoResponseSchema } from '~/infra/http/dto/todos';
import { API } from '~/ui/lib/api';

defineOptions({
  name: 'HomePage',
});

const app = useNuxtApp();

const { data: cachedTodos } = useNuxtData<MultipleTodosResponse>('todos');
const { data } = useFetch<MultipleTodosResponse>('/api/todos', {
  key: 'todos',
  getCachedData: (key) => app.payload.data[key],
  default: () => ({ todos: [] }),
});

async function deleteTodo(id: Todo['id']) {
  const { data: cachedTodo } = useNuxtData<SingleTodoResponse>(`todo-${id}`);

  await API.delete(`/api/todos/${id}`, {
    originalData: data,
    optimisticUpdate() {
      data.value.todos = data.value.todos.filter((todo) => todo.id !== id);
    },
    onResponse() {
      cachedTodo.value = null;
      app.payload.data[`todo-${id}`] = cachedTodo.value;
    },
  });
}

async function toggleTodo(id: Todo['id']) {
  if (!data.value?.todos) return;

  const todo = data.value.todos.find((todo) => todo.id === id);
  if (!todo) return;

  await API.patch<MultipleTodosResponse>(`/api/todos/${id}`, {
    body: { isCompleted: !todo.isCompleted },
    originalData: data,
    optimisticUpdate() {
      todo.isCompleted = !todo.isCompleted;
    },
    onResponse({ response }) {
      const { todo: newTodo } = singleTodoResponseSchema.parse(response._data);
      if (!newTodo) return;

      const { data: cachedTodo } = useNuxtData<SingleTodoResponse>(
        `todo-${id}`,
      );

      cachedTodo.value = { todo: newTodo };
      app.payload.data[`todo-${id}`] = cachedTodo.value;

      cachedTodos.value = {
        todos: data.value.todos.map((todo) =>
          todo.id === id ? newTodo : todo,
        ),
      };
      app.payload.data.todos = cachedTodos.value;
    },
  });
}
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
            @click="toggleTodo(todo.id)"
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
              @click.prevent.stop="deleteTodo(todo.id)"
            >
              <div i-mdi:delete></div>
            </UiButton>
          </NuxtLink>
        </UiTableCell>
      </UiTableRow>
    </UiTableBody>
  </UiTable>
</template>
