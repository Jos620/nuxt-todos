<script setup lang="ts">
useDark();
</script>

<template>
  <header p-4 border="b-1 muted">
    <div container mx-auto center justify-between>
      <NuxtLink to="/">
        <h3>Nuxt Todo List</h3>
      </NuxtLink>

      <NuxtLink to="/todo/create">
        <UiButton flex gap-2>
          <div i-mdi:pencil />
          New
        </UiButton>
      </NuxtLink>
    </div>
  </header>

  <main p="4 md:y-10 lg:y-20">
    <div container mx-auto>
      <slot />
    </div>
  </main>
</template>
