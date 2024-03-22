<script setup lang="ts">
const isDark = useDark();
</script>

<template>
  <header p-4 border="b-1 muted" bg="white dark:black" sticky top-0 z-1>
    <div container mx-auto center justify-between>
      <NuxtLink to="/">
        <h3>Todo List</h3>
      </NuxtLink>

      <div center gap-4>
        <UiButton variant="outline" @click="isDark = !isDark">
          <div v-if="isDark" i-mdi:white-balance-sunny />
          <div v-else i-mdi:weather-night />
        </UiButton>

        <NuxtLink to="/todo/create">
          <UiButton flex gap-3>
            New
            <UiKBD class="<lg:hidden">/</UiKBD>
          </UiButton>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
