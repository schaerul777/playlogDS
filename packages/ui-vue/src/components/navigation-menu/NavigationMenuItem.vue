<script setup lang="ts">
import type { NavigationMenuItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { NavigationMenuItem } from "reka-ui"

const props = defineProps<NavigationMenuItemProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <NavigationMenuItem data-slot="navigation-menu-item" :value="props.value" :as="props.as" :as-child="props.asChild" :class="cn('relative', props.class)">
    <slot />
  </NavigationMenuItem>
</template>
