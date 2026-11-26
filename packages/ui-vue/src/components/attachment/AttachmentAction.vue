<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Button } from "@workspace/ui-vue/components/button"

// Playlog: remove and similar actions are Button ghost icon-xs (24); give each one an aria-label.
const props = withDefaults(defineProps<{ variant?: InstanceType<typeof Button>["$props"]["variant"]; size?: InstanceType<typeof Button>["$props"]["size"]; class?: HTMLAttributes["class"] }>(), {
  variant: "ghost",
  size: "icon-xs",
})
</script>

<template>
  <Button data-slot="attachment-action" :variant="variant" :size="size" :class="props.class">
    <slot />
  </Button>
</template>
