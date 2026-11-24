<script setup lang="ts">
import type { MenubarSeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { MenubarSeparator } from "reka-ui"

const props = defineProps<MenubarSeparatorProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: 1px border, 4 above and below, edge to edge. -->
  <MenubarSeparator
    data-slot="menubar-separator"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('-mx-1 my-1 h-(--pl-border-width) bg-border', props.class)"
  />
</template>
