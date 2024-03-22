<script lang="ts" setup>
import type { LabelProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';

import { cn } from '@/ui/lib/utils';

import { useFormField } from './useFormField';

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>();

defineOptions({
  name: 'UiFormLabel',
});

const { error, formItemId } = useFormField();
</script>

<template>
  <UiLabel
    :class="cn(error && 'text-destructive', props.class)"
    :for="formItemId"
  >
    <slot />
  </UiLabel>
</template>
