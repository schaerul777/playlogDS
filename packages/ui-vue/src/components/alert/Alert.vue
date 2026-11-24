<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { AlertVariants } from "."
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { alertVariants } from "."

const props = defineProps<{
  class?: HTMLAttributes["class"]
  variant?: AlertVariants["variant"]
}>()
</script>

<template>
  <div
    data-slot="alert"
    role="alert"
    :class="cn(alertVariants({ variant }), props.class)"
  >
    <slot />
  </div>
</template>
