<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: 16 between the children of a fieldset; 12 between radio or checkbox items. -->
  <fieldset
    data-slot="field-set"
    :class="cn('flex min-w-0 flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3', props.class)"
  >
    <slot />
  </fieldset>
</template>
