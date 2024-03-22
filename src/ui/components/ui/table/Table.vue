<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

import { cn } from '@/ui/lib/utils';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();

defineOptions({
  name: 'UiTable',
});
</script>

<template>
  <div
    class="relative w-full overflow-auto border border-muted rounded-md bg-white dark:bg-black"
  >
    <table :class="cn('w-full caption-bottom text-sm', props.class)">
      <slot />
    </table>
  </div>
</template>
