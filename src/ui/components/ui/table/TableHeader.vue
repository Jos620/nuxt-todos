<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

import { cn } from '@/ui/lib/utils';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();

defineOptions({
  name: 'UiTableHeader',
});
</script>

<template>
  <thead :class="cn('[&_tr]:border-b', props.class)">
    <slot />
  </thead>
</template>
