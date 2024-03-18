<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Field, useForm } from 'vee-validate';

import type { CreateTodoResponse } from '~/infra/http/api/todos/index.post';
import { createTodoDTO } from '~/infra/http/dto/todos';
import { API } from '~/ui/lib/api';

const router = useRouter();

const form = useForm({
  validationSchema: toTypedSchema(createTodoDTO),
});

const onSubmit = form.handleSubmit(async (values) => {
  const { todo } = await API.post<CreateTodoResponse>('/api/todos', {
    body: values,
    revalidateKey: 'todos',
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
@/ui/lib/api
