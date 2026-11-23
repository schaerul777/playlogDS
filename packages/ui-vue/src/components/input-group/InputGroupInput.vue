<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Input } from "@workspace/ui-vue/components/input"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { inputGroupControl } from "."

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <Input data-slot="input-group-control" :class="cn(inputGroupControl, 'h-full', props.class)" />
</template>
