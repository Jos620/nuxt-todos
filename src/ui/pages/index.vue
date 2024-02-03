<script setup lang="ts">
const isDark = useDark();

const githubRepoLink = 'https://github.com/jos620/nuxt-template';
const githubRepoName = githubRepoLink.split('/').slice(-2).join('/');
</script>

<template>
  <main h-svh center col="<sm:~" gap-2 relative>
    <h1>Nuxt Template!</h1>

    <a class="sm:hidden" :href="githubRepoLink" target="_blank">
      <div i-mdi:github w-12 h-12></div>
    </a>

    <UiHoverCard :open-delay="125">
      <UiHoverCardTrigger as-child>
        <a class="<sm:hidden" :href="githubRepoLink" target="_blank">
          <div i-mdi:github w-12 h-12></div>
        </a>
      </UiHoverCardTrigger>
      <UiHoverCardContent as-child>
        <a :href="githubRepoLink" flex items-center gap-4>
          <div center gap-4 h-9>
            <div i-mdi:github w-8 h-8></div>
            <UiSeparator orientation="vertical" />
          </div>

          <div col justify-center gap="2px">
            <p text-small>
              {{ githubRepoName }}
            </p>
            <span text-muted>GitHub</span>
          </div>
        </a>
      </UiHoverCardContent>
    </UiHoverCard>

    <div absolute bottom-4 right-4 center gap-4>
      <Counter />

      <ClientOnly>
        <UiButton @click="() => (isDark = !isDark)">
          <div v-if="isDark" i-mdi:weather-night />
          <div v-else i-mdi:white-balance-sunny />
        </UiButton>
      </ClientOnly>
    </div>
  </main>
</template>
