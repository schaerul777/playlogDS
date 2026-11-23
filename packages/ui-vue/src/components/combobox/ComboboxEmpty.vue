<script setup lang="ts">
import type { ComboboxEmptyProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { ComboboxEmpty } from "reka-ui"

const props = defineProps<ComboboxEmptyProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: "No results" 14/20 muted-foreground, centred, padding 8 12. Reka shows it only when nothing matches. -->
  <ComboboxEmpty
    data-slot="combobox-empty"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('flex w-full justify-center px-3 py-2 text-center text-body-sm text-muted-foreground', props.class)"
  >
    <slot />
  </ComboboxEmpty>
</template>
