<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt';
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <SpeedInsights />
</template>

<style src="@unocss/reset/tailwind.css"></style>
<style src="~/assets/styles/typography.scss" lang="scss"></style>
