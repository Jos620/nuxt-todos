<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { AvatarRoot } from 'radix-vue';

import { cn } from '~/ui/lib/utils';

const avatarVariant = cva(
  'inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden',
  {
    variants: {
      size: {
        sm: 'h-10 w-10 text-xs',
        base: 'h-16 w-16 text-2xl',
        lg: 'h-32 w-32 text-5xl',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-md',
      },
    },
  },
);

type AvatarVariantProps = VariantProps<typeof avatarVariant>;

interface Props {
  size?: AvatarVariantProps['size'];
  shape?: AvatarVariantProps['shape'];
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'sm',
  shape: 'circle',
});
</script>

<template>
  <AvatarRoot :class="cn(avatarVariant({ size, shape }), props.class)">
    <slot />
  </AvatarRoot>
</template>
