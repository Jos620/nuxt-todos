<script setup lang="ts">
import { isFocusingInput } from '../lib/window';

const isDark = useDark();

const router = useRouter();

onKeyStroke('/', (e) => {
  if (isFocusingInput()) {
    return;
  }

  e.preventDefault();
  router.push('/todo/create');
});
</script>

<template>
  <header p-4 border="b-1 muted" bg="white dark:black">
    <div container mx-auto center justify-between>
      <NuxtLink to="/">
        <h3>Nuxt Todo List</h3>
      </NuxtLink>

      <div center gap-4>
        <UiButton variant="outline" @click="isDark = !isDark">
          <div v-if="isDark" i-mdi:white-balance-sunny />
          <div v-else i-mdi:weather-night />
        </UiButton>

        <NuxtLink to="/todo/create">
          <UiButton flex gap-3>
            New
            <KBD>/</KBD>
          </UiButton>
        </NuxtLink>
      </div>
    </div>
  </header>

  <main p="4 md:y-10 lg:y-20">
    <div container mx-auto>
      <slot />
    </div>
  </main>
</template>
