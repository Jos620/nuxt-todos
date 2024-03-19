<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Field, useForm } from 'vee-validate';

import type {
  MultipleTodosResponse,
  SingleTodoResponse,
} from '@/infra/http/view-models/todo';
import { createTodoDTO } from '~/infra/http/dto/todos';
import { API } from '~/ui/lib/api';

const app = useNuxtApp();
const router = useRouter();

const { data: cachedTodos } = useNuxtData<MultipleTodosResponse>('todos');

const form = useForm({
  validationSchema: toTypedSchema(createTodoDTO),
});

const onSubmit = form.handleSubmit(async (values) => {
  const { todo } = await API.post<SingleTodoResponse>('/api/todos', {
    body: values,
  });
  if (!todo) return;

  app.payload.data[`todo-${todo.id}`] = { todo };
  cachedTodos.value?.todos.push(todo);

  router.push(`/todo/${todo.id}`);
});

onMounted(() => {
  const titleInput = document.querySelector<HTMLInputElement>(
    'input[name="title"]',
  );
  titleInput?.focus();
});
</script>

<template>
  <form space-y-6 max-w="5xl" mx-auto @submit="onSubmit">
    <Field v-slot="{ componentField }" name="title">
      <UiFormItem>
        <UiFormLabel>Title</UiFormLabel>
        <UiFormControl>
          <UiInput
            type="text"
            placeholder="What needs to be done?"
            v-bind="componentField"
          />
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </Field>

    <Field v-slot="{ componentField }" name="description">
      <UiFormItem>
        <UiFormLabel>Description</UiFormLabel>
        <UiFormControl>
          <UiTextarea placeholder="Add a description" v-bind="componentField" />
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </Field>

    <UiButton type="submit">Submit</UiButton>
  </form>
</template>
