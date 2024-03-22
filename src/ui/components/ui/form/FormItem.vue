<script lang="ts">
import type { HTMLAttributes, InjectionKey } from 'vue';
import { provide } from 'vue';

import { cn } from '@/ui/lib/utils';

defineOptions({
  name: 'UiFormItem',
});

export const FORM_ITEM_INJECTION_KEY = Symbol(
  'formItem',
) as InjectionKey<string>;
</script>

<script setup lang="ts">
const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();

const id = useId();
provide(FORM_ITEM_INJECTION_KEY, id);
</script>

<template>
  <div :class="cn('space-y-2', props.class)">
    <slot />
  </div>
</template>
