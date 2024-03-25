<script setup lang="ts">
defineOptions({
  name: 'DefaultLayout',
});

useDark();
useKeyboardShortcuts();
</script>

<template>
  <LayoutHeader />

  <main p="4 md:y-10 lg:y-20">
    <div container mx-auto>
      <slot />
    </div>
  </main>
</template>
