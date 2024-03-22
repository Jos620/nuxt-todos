<script setup lang="ts">
import { Separator, type SeparatorProps } from 'radix-vue';

import { cn } from '~/ui/lib/utils';

interface Props extends SeparatorProps {
  class?: string;
}

const props = defineProps<Props>();

defineOptions({
  name: 'UiSeparator',
});
</script>

<template>
  <Separator
    :class="[
      cn('shrink-0 bg-border', props.class),
      props.orientation === 'vertical' ? 'w-px h-full' : 'h-px w-full',
    ]"
  />
</template>
