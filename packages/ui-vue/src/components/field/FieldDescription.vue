<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: 12/16 medium muted-foreground. Hidden while the field shows an error (the error replaces it). -->
  <p
    data-slot="field-description"
    :class="cn('text-left text-caption text-muted-foreground group-has-[[data-slot=field-error]]/field:hidden group-has-data-horizontal/field:text-balance', '[&>a]:text-link [&>a]:underline', props.class)"
  >
    <slot />
  </p>
</template>
