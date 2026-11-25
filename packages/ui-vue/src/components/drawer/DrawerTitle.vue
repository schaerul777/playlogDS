<script setup lang="ts">
import type { DrawerTitleProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { DrawerTitle } from "reka-ui"

const props = defineProps<DrawerTitleProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: 16/24 bold ink-heading. -->
  <DrawerTitle data-slot="drawer-title" :as="props.as" :as-child="props.asChild" :class="cn('font-heading text-h3 text-ink-heading', props.class)">
    <slot />
  </DrawerTitle>
</template>
