<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'radix-vue';

import { cn } from '~/ui/lib/utils';

interface Props extends PrimitiveProps {
  as?: keyof HTMLElementTagNameMap;
  asChild?: boolean;
}

withDefaults(defineProps<Props>(), {
  as: 'kbd',
  asChild: false,
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="
      cn(
        'p-1 px-2 text-xs font-mono rounded bg-primary text-primary-foreground border border-muted/20',
        $attrs.class ?? '',
      )
    "
  >
    <slot />
  </Primitive>
</template>
