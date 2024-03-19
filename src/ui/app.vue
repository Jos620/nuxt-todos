<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt';
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
