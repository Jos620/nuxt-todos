<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority';
import { Primitive, type PrimitiveProps } from 'radix-vue';

import { cn } from '~/ui/lib/utils';

defineOptions({
  name: 'UiKBD',
});

const kbdVariants = cva('font-mono rounded', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground border border-muted/20',
      secondary: 'bg-accent text-accent-foreground border border-muted',
    },
    size: {
      default: 'p-1 px-2 text-xs',
      small: 'p-0.5 px-1 text-xs',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type KBDVariantProps = VariantProps<typeof kbdVariants>;

interface Props extends PrimitiveProps {
  variant?: KBDVariantProps['variant'];
  size?: KBDVariantProps['size'];
  as?: keyof HTMLElementTagNameMap;
  asChild?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  as: 'kbd',
  asChild: false,
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(kbdVariants({ variant, size }), $attrs.class ?? '')"
  >
    <slot />
  </Primitive>
</template>
