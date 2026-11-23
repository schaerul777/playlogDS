<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="field-content" :class="cn('group/field-content flex flex-1 flex-col gap-0.5', props.class)">
    <slot />
  </div>
</template>
