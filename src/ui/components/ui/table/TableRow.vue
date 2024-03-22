<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

import { cn } from '@/ui/lib/utils';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();

defineOptions({
  name: 'UiTableRow',
});
</script>

<template>
  <tr
    :class="
      cn(
        'border-b border-muted transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        props.class,
      )
    "
  >
    <slot />
  </tr>
</template>
