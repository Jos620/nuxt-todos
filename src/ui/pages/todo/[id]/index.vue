<script setup lang="ts">
import { useRoute } from 'vue-router';

import type { TodoIdResponse } from '~/infra/http/api/todos/[id]/index.get';

const router = useRoute();

const { data } = useFetch<TodoIdResponse>(`/api/todos/${router.params.id}`);
</script>

<template>
  <main p="4 md:y-10 lg:y-20">
    <div container mx-auto>
      <h2>{{ data?.todo.title }}</h2>

      <div v-if="data?.todo.description">
        <UiSeparator my-4 />
        <p>{{ data?.todo.description }}</p>
      </div>
    </div>
  </main>
</template>
