<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Button } from "@workspace/ui-vue/components/button"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { DialogClose } from "reka-ui"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    showCloseButton?: boolean
  }>(),
  { showCloseButton: false }
)
</script>

<template>
  <!-- Playlog: buttons in a row aligned right, gap 8; stacked full width below sm. -->
  <div
    data-slot="dialog-footer"
    :class="cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', props.class)"
  >
    <slot />
    <DialogClose v-if="showCloseButton" as-child>
      <Button variant="outline">Close</Button>
    </DialogClose>
  </div>
</template>
