<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="alert-title"
    :class="cn(
      // Playlog: title is bold in the alert's text colour.
      'font-bold group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
