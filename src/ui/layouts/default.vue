<script setup lang="ts">
useDark();
</script>

<template>
  <header p-4 border="b-1 muted">
    <div container mx-auto>
      <NuxtLink to="/">
        <h3>Nuxt Todo List</h3>
      </NuxtLink>
    </div>
  </header>

  <slot />
</template>
