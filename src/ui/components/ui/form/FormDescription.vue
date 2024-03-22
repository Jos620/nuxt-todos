<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

import { cn } from '@/ui/lib/utils';

import { useFormField } from './useFormField';

defineOptions({
  name: 'UiFormDescription',
});

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();

const { formDescriptionId } = useFormField();
</script>

<template>
  <p
    :id="formDescriptionId"
    :class="cn('text-sm text-muted-foreground', props.class)"
  >
    <slot />
  </p>
</template>
