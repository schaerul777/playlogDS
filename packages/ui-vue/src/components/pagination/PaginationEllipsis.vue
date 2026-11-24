<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: `more` glyph in muted-foreground, in a 40 square. -->
  <span
    aria-hidden="true"
    data-slot="pagination-ellipsis"
    :class="cn('flex size-10 items-center justify-center text-muted-foreground [&_svg:not([class*=\'size-\'])]:size-4', props.class)"
  >
    <Icon name="more" />
    <span class="sr-only">More pages</span>
  </span>
</template>
