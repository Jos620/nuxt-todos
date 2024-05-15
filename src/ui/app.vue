<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt';

import { type Theme, THEME_KEY } from './lib/theme';

const isDarkCookie = useCookie<Theme>(THEME_KEY);

useDark({
  onChanged: (value) => {
    isDarkCookie.value = value ? 'dark' : 'light';
  },
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <SpeedInsights />
</template>

<style src="@unocss/reset/tailwind-compat.css"></style>
<style src="~/ui/assets/styles/global.scss" lang="scss"></style>
<style src="~/ui/assets/styles/typography.scss" lang="scss"></style>
