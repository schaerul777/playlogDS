<script setup lang="ts">
import type { DialogDescriptionProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { DialogDescription } from "reka-ui"

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: 14/20 muted-foreground. -->
  <DialogDescription data-slot="sheet-description" :as="props.as" :as-child="props.asChild" :class="cn('text-body-sm text-muted-foreground', props.class)">
    <slot />
  </DialogDescription>
</template>
