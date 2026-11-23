<script setup lang="ts">
import type { DropdownMenuSeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { DropdownMenuSeparator } from "reka-ui"

const props = defineProps<DropdownMenuSeparatorProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: 1px border, 4 above and below, edge to edge. -->
  <DropdownMenuSeparator
    data-slot="dropdown-menu-separator"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('-mx-1 my-1 h-(--pl-border-width) bg-border', props.class)"
  />
</template>
