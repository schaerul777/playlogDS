<script setup lang="ts">
import type { NavigationMenuRootEmits, NavigationMenuRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { NavigationMenuRoot, useForwardPropsEmits } from "reka-ui"
import NavigationMenuViewport from "./NavigationMenuViewport.vue"

const props = defineProps<NavigationMenuRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<NavigationMenuRootEmits>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <!-- Playlog: labelled nav landmark (pass aria-label to override). Hidden below md; small screens use the Sidebar (Sheet) instead (agreed). -->
  <NavigationMenuRoot
    v-slot="slotProps"
    data-slot="navigation-menu"
    aria-label="Main"
    v-bind="forwarded"
    :class="cn('group/navigation-menu relative flex max-w-max flex-1 items-center justify-center max-md:hidden', props.class)"
  >
    <slot v-bind="slotProps" />
    <NavigationMenuViewport />
  </NavigationMenuRoot>
</template>
