<script setup lang="ts">
interface Props {
  initialCount?: number;
}
const { initialCount = 0 } = defineProps<Props>();

const store = useCountStore();

store.count = initialCount;
</script>

<template>
  <UiButton variant="outline" @click="store.increment">
    Counter: {{ store.count }}
  </UiButton>
</template>
