<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useSlots } from "vue"
import { Separator } from "@workspace/ui-vue/components/separator"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
const slots = useSlots()
</script>

<template>
  <!-- Playlog: 1px border, optional centred caption on the page background. -->
  <div data-slot="field-separator" :data-content="!!slots.default" :class="cn('relative h-4 text-caption', props.class)">
    <Separator class="absolute inset-x-0 top-1/2" />
    <span
      v-if="slots.default"
      class="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
      data-slot="field-separator-content"
    >
      <slot />
    </span>
  </div>
</template>
