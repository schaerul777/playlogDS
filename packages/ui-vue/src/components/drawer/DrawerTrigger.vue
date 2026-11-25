<script setup lang="ts">
import type { DrawerTriggerProps } from "reka-ui"
import { DrawerTrigger } from "reka-ui"

const props = defineProps<DrawerTriggerProps>()
</script>

<template>
  <DrawerTrigger data-slot="drawer-trigger" :as="props.as" :as-child="props.asChild">
    <slot />
  </DrawerTrigger>
</template>
