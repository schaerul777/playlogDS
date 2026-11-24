<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { onBeforeUnmount, onMounted, useId } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { injectProgressContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { labelId } = injectProgressContext()
const id = useId()
onMounted(() => (labelId.value = id))
onBeforeUnmount(() => {
  if (labelId.value === id) labelId.value = undefined
})
</script>

<template>
  <span :id="id" role="presentation" data-slot="progress-label" :class="cn('text-label text-foreground', props.class)">
    <slot />
  </span>
</template>
