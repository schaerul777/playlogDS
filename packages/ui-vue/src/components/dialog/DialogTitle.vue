<script setup lang="ts">
import type { DialogTitleProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { DialogTitle } from "reka-ui"

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <DialogTitle
    data-slot="dialog-title"
    :as="props.as"
    :as-child="props.asChild"
    :class="
      cn(
        // Playlog: 16/24 bold ink-heading, same as the Card title.
        'font-heading text-h3 text-ink-heading',
        props.class,
      )
    "
  >
    <slot />
  </DialogTitle>
</template>
