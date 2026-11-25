<script setup lang="ts">
import type { AccordionItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { AccordionItem, useForwardProps } from "reka-ui"

const props = defineProps<AccordionItemProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <AccordionItem
    v-slot="slotProps"
    data-slot="accordion-item"
    v-bind="forwardedProps"
    :class="cn(
      // Playlog: COMPONENT-SPECS Accordion. 1px border between items, none above the first or below the last.
      'border-border not-last:border-b-(length:--pl-border-width)',
      props.class,
    )"
  >
    <slot v-bind="slotProps" />
  </AccordionItem>
</template>
