<script setup lang="ts">
import type { DrawerDescriptionProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { DrawerDescription } from "reka-ui"

const props = defineProps<DrawerDescriptionProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: 14/20 muted-foreground. -->
  <DrawerDescription data-slot="drawer-description" :as="props.as" :as-child="props.asChild" :class="cn('text-body-sm text-muted-foreground', props.class)">
    <slot />
  </DrawerDescription>
</template>
