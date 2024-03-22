<script setup lang="ts">
import { isFocusingInput } from '../lib/window';

defineOptions({
  name: 'DefaultLayout',
});

useDark();

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
  <LayoutHeader />

  <main p="4 md:y-10 lg:y-20">
    <div container mx-auto>
      <slot />
    </div>
  </main>
</template>
