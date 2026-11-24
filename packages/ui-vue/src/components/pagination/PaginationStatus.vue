<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

// Playlog: compact status for small screens, "Page 3 of 12" (agreed). Put it between Previous and Next
// and hide the page links below sm.
const props = defineProps<{ class?: HTMLAttributes["class"]; page: number; pageCount: number }>()
</script>

<template>
  <li data-slot="pagination-status" aria-live="polite" :class="cn('px-2 text-body-sm text-muted-foreground tabular-nums sm:hidden', props.class)">
    Page {{ page }} of {{ pageCount }}
  </li>
</template>
