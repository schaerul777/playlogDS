<script setup lang="ts">
import type { DrawerCloseProps } from "reka-ui"
import { DrawerClose } from "reka-ui"

const props = defineProps<DrawerCloseProps>()
</script>

<template>
  <DrawerClose data-slot="drawer-close" :as="props.as" :as-child="props.asChild">
    <slot />
  </DrawerClose>
</template>
