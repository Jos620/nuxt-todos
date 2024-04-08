<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Field, useForm } from 'vee-validate';

import type { SingleTodoResponse } from '@/infra/http/dto/todos';
import { createTodoDTO } from '~/infra/http/dto/todos';
import { vResizeTextarea } from '~/ui/directives/resize-textarea';
import { API } from '~/ui/lib/api';

defineOptions({
  name: 'CreateTodoPage',
});

const router = useRouter();

const todosStore = useTodosStore();
const { singleCachedTodo } = storeToRefs(todosStore);

const form = useForm({
  validationSchema: toTypedSchema(createTodoDTO),
});

const onSubmit = form.handleSubmit(async (values) => {
  const { todo } = await API.post<SingleTodoResponse>('/api/todos', {
    body: values,
  });
  if (!todo) return;

  singleCachedTodo.value = todo;
  router.push(`/todo/${todo.id}`);
});

function focusTitleInput() {
  const titleInput = document.querySelector<HTMLInputElement>(
    'input[name="title"]',
  );
  titleInput?.focus();
}

onMounted(focusTitleInput);
onStartTyping(() => {
  if (!form.values.title) {
    focusTitleInput();
  }
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
          <UiTextarea
            v-resize-textarea
            placeholder="Add a description"
            v-bind="componentField"
          />
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </Field>

    <UiButton type="submit">Submit</UiButton>
  </form>
</template>
