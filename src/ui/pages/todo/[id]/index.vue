<script setup lang="ts">
import { useRoute } from 'vue-router';

import type { TodoIdResponse } from '~/infra/http/api/todos/[id]/index.get';

const route = useRoute();

const { data } = useFetch<TodoIdResponse>(`/api/todos/${route.params.id}`);
</script>

<template>
  <main p="4 md:y-10 lg:y-20">
    <div container mx-auto>
      <div flex items-center gap-2>
        <NuxtLink to="/">
          <div i-mdi:chevron-left text="2xl muted hover:primary" />
        </NuxtLink>

        <h2 pb-0>{{ data?.todo.title }}</h2>
      </div>

      <div v-if="data?.todo.description">
        <UiSeparator my-4 />
        <p>{{ data?.todo.description }}</p>
      </div>
    </div>
  </main>
</template>
