<script setup lang="ts">
import type { DrawerPortalProps } from "reka-ui"
import { DrawerPortal } from "reka-ui"

const props = defineProps<DrawerPortalProps>()
</script>

<template>
  <DrawerPortal :to="props.to" :disabled="props.disabled" :defer="props.defer" :force-mount="props.forceMount">
    <slot />
  </DrawerPortal>
</template>
