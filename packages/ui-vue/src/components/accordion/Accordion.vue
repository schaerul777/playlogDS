<script setup lang="ts">
import type { AccordionRootEmits, AccordionRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { AccordionRoot, useForwardPropsEmits } from "reka-ui"

// Playlog: single and collapsible by default, like Base UI's Accordion (one open item that can be closed again).
// Reka's `type="multiple"` is Base UI's `multiple`.
const props = withDefaults(defineProps<AccordionRootProps & { class?: HTMLAttributes["class"] }>(), {
  type: "single",
  collapsible: true,
})
const emits = defineEmits<AccordionRootEmits>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <AccordionRoot
    v-slot="slotProps"
    data-slot="accordion"
    v-bind="forwarded"
    :class="cn('flex w-full flex-col', props.class)"
  >
    <slot v-bind="slotProps" />
  </AccordionRoot>
</template>
