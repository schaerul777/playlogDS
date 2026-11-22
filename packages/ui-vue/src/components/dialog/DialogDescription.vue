<script setup lang="ts">
import type { DialogDescriptionProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { DialogDescription } from "reka-ui"

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <DialogDescription
    data-slot="dialog-description"
    :as="props.as"
    :as-child="props.asChild"
    :class="
      cn(
        // Playlog: 14/20 muted-foreground; links use the link token.
        'text-body-sm text-muted-foreground *:[a]:text-link *:[a]:underline',
        props.class,
      )
    "
  >
    <slot />
  </DialogDescription>
</template>
