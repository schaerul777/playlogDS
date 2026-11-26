<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@workspace/ui-vue/components/dialog"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { useForwardPropsEmits } from "reka-ui"
import Command from "./Command.vue"

const props = withDefaults(
  defineProps<DialogRootProps & { title?: string; description?: string; class?: HTMLAttributes["class"] }>(),
  { title: "Command palette", description: "Search for a command to run." },
)
const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Dialog v-slot="slotProps" v-bind="forwarded">
    <!-- Playlog: our Dialog, max width 512, top edge at a third of the viewport, no padding; radius 8. -->
    <DialogContent :show-close-button="false" :class="cn('top-1/3 translate-y-0 gap-0 overflow-hidden p-0', props.class)">
      <DialogHeader class="sr-only">
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription>{{ description }}</DialogDescription>
      </DialogHeader>
      <Command>
        <slot v-bind="slotProps" />
      </Command>
    </DialogContent>
  </Dialog>
</template>
