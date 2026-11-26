<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { bubbleReactionsVariants } from "."

const props = withDefaults(defineProps<{ side?: "top" | "bottom"; align?: "start" | "end"; class?: HTMLAttributes["class"] }>(), {
  side: "bottom",
  align: "end",
})
</script>

<template>
  <div data-slot="bubble-reactions" :data-align="align" :data-side="side" :class="cn(bubbleReactionsVariants({ side, align }), props.class)">
    <slot />
  </div>
</template>
