<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

import { cn } from '@/ui/lib/utils';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();

defineOptions({
  name: 'UiTableCell',
});
</script>

<template>
  <td
    :class="cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', props.class)"
  >
    <slot />
  </td>
</template>
