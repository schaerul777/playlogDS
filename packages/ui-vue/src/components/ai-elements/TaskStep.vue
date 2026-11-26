<script setup lang="ts">
import { TraceLine, TraceStatusIcon, TraceTitle } from "@workspace/ui-vue/components/trace"
import type { IconName } from "@workspace/ui-vue/icons"

// One step, glyph `search`, `sticky-note` (file) or `edit`. With `href` it is a link: trailing `arrow-up-right` and
// "(opens in a new tab)" for screen readers.
withDefaults(defineProps<{ title: string; icon?: IconName; status?: "running" | "error"; href?: string }>(), { icon: "search" })
</script>

<template>
  <a
    v-if="href"
    :href="href"
    target="_blank"
    rel="noreferrer"
    class="w-fit rounded-md outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring"
  >
    <TraceLine :status="status">
      <TraceStatusIcon :status="status" :icon="icon" />
      <TraceTitle>{{ title }}<span class="sr-only"> (opens in a new tab)</span></TraceTitle>
      <TraceStatusIcon icon="arrow-up-right" />
    </TraceLine>
  </a>
  <TraceLine v-else :status="status">
    <TraceStatusIcon :status="status" :icon="icon" />
    <TraceTitle>{{ title }}</TraceTitle>
  </TraceLine>
</template>
