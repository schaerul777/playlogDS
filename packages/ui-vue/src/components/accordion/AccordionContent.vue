<script setup lang="ts">
import type { AccordionContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { AccordionContent } from "reka-ui"

const props = defineProps<AccordionContentProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
</script>

<template>
  <!-- Playlog: height animates at --pl-duration-fast. (Reka: keyframes on --reka-accordion-content-height, not Base UI's panel height variable.) -->
  <AccordionContent
    data-slot="accordion-content"
    v-bind="delegatedProps"
    class="overflow-hidden text-body-sm text-muted-foreground duration-(--pl-duration-fast) ease-out data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
  >
    <!-- Playlog: padding 0 0 16; links use the link token. -->
    <div :class="cn('pb-4 [&_a]:text-link [&_a]:underline [&_p:not(:last-child)]:mb-4', props.class)">
      <slot />
    </div>
  </AccordionContent>
</template>
