<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Field, useForm } from 'vee-validate';

import type { TodosResponse } from '@/infra/http/api/todos/index.get';
import type { CreateTodoResponse } from '~/infra/http/api/todos/index.post';
import { bodySchema } from '~/infra/http/dto/todos';

const app = useNuxtApp();
const router = useRouter();

useNuxtData<TodosResponse>('todos');

const form = useForm({
  validationSchema: toTypedSchema(bodySchema),
});

const onSubmit = form.handleSubmit(async (values) => {
  const { todo } = await $fetch<CreateTodoResponse>('/api/todos', {
    method: 'POST',
    body: values,
    async onResponse() {
      await refreshNuxtData('todos');
      app.payload.data.todos = undefined;
    },
  });
  if (!todo) return;

  router.push(`/todo/${todo.id}`);
});
</script>

<template>
  <form space-y-6 @submit="onSubmit">
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
