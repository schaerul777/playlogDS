<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="field-label" :class="cn('flex w-fit items-center gap-2 text-label text-foreground group-data-[disabled=true]/field:opacity-(--pl-opacity-disabled)', props.class)">
    <slot />
  </div>
</template>
