<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <li
    data-slot="sidebar-menu-item"
    data-sidebar="menu-item"
    :class="cn('group/menu-item relative before:pointer-events-none before:absolute before:inset-y-2 before:-left-3 before:w-0.75 before:bg-brand-accent before:opacity-0 has-[>[data-slot=sidebar-menu-button][data-active]]:before:opacity-100 group-data-[collapsible=icon]:before:hidden', props.class)"
  >
    <slot />
  </li>
</template>
