<script setup lang="ts">
// Playlog: COMPONENT-SPECS Collapsible. Unstyled wrapper; only the height animation is styled.
import type { CollapsibleContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { CollapsibleContent } from "reka-ui"

const props = defineProps<CollapsibleContentProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
</script>

<template>
  <CollapsibleContent
    data-slot="collapsible-content"
    v-bind="delegatedProps"
    :class="cn(
      'overflow-hidden duration-(--pl-duration-fast) ease-out data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
      props.class,
    )"
  >
    <slot />
  </CollapsibleContent>
</template>
