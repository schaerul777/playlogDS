<script setup lang="ts">
import { computed } from "vue"
import { Button } from "@workspace/ui-vue/components/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@workspace/ui-vue/components/hover-card"

export type Citation = { url: string; title: string; description?: string }

const props = defineProps<{ source: Citation }>()
const host = computed(() => {
  try {
    return new URL(props.source.url).hostname.replace(/^www\./, "")
  } catch {
    return props.source.url
  }
})
</script>

<template>
  <!-- Playlog: COMPONENT-SPECS Inline Citation. Button `secondary` `xs` with the hostname, on a Hover Card (width 256) with the
       title (14/20 semibold), description (14/20 muted) and the link (12/16, underlined). Opens after 150ms on hover or
       focus and closes after 150ms. -->
  <HoverCard :open-delay="150" :close-delay="150">
    <HoverCardTrigger as-child>
      <Button variant="secondary" size="xs" class="mx-0.5 align-baseline">{{ host }}</Button>
    </HoverCardTrigger>
    <HoverCardContent class="flex w-64 flex-col gap-1">
      <div class="text-label">{{ source.title }}</div>
      <p v-if="source.description" class="text-body-sm text-muted-foreground">{{ source.description }}</p>
      <a
        :href="source.url"
        target="_blank"
        rel="noreferrer"
        class="rounded-sm text-caption text-muted-foreground underline underline-offset-4 outline-none hover:text-foreground focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring"
      >
        {{ host }}<span class="sr-only"> (opens in a new tab)</span>
      </a>
    </HoverCardContent>
  </HoverCard>
</template>
