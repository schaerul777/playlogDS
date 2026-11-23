<script setup lang="ts">
import type { DialogOverlayProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { DialogOverlay } from "reka-ui"

const props = defineProps<DialogOverlayProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <DialogOverlay
    data-slot="sheet-overlay"
    :as="props.as"
    :as-child="props.asChild"
    :force-mount="props.forceMount"
    :class="
      cn(
        // Playlog: dims the page with --pl-scrim, no blur. Fades at --pl-duration-fast.
        'fixed inset-0 z-50 bg-scrim duration-(--pl-duration-fast) ease-out data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        props.class,
      )
    "
  >
    <slot />
  </DialogOverlay>
</template>
