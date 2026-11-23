<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Textarea } from "@workspace/ui-vue/components/textarea"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { inputGroupControl } from "."

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <Textarea data-slot="input-group-control" :class="cn(inputGroupControl, 'py-2', props.class)" />
</template>
