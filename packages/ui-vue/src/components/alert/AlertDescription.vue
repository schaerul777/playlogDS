<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="alert-description"
    :class="cn(
      // Playlog: description keeps the alert's text colour (the spec gives one text colour per alert).
      'text-body-sm text-balance md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
