<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { TraceStatus } from "."
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

// Playlog: error is danger-text; running keeps the text steady (the Spinner is the signal); pending is muted.
const props = defineProps<{ status?: TraceStatus; class?: HTMLAttributes["class"] }>()
</script>

<template>
  <span
    data-slot="trace-line"
    :data-status="status"
    :class="
      cn(
        'flex w-fit max-w-full min-w-0 items-center gap-2 text-body-sm text-muted-foreground transition-colors duration-(--pl-duration-fast) ease-out in-[a,button]:cursor-pointer in-[a:hover,button:hover]:text-foreground data-[status=error]:text-danger-text data-[status=error]:in-[a:hover,button:hover]:text-danger-text',
        props.class,
      )
    "
  >
    <slot />
  </span>
</template>
