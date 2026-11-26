<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="chat-footer" :class="cn('mx-auto flex w-full max-w-3xl flex-col gap-2 p-4', props.class)"><slot /></div>
</template>
