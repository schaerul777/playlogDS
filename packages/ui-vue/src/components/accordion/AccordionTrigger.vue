<script setup lang="ts">
import type { AccordionTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { AccordionHeader, AccordionTrigger } from "reka-ui"

// Playlog: extra attributes go to the button (as in React), not to the heading wrapper.
defineOptions({ inheritAttrs: false })

const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      data-slot="accordion-trigger"
      v-bind="{ ...delegatedProps, ...$attrs }"
      :class="cn(
        // Playlog: full width, padding 16 0, 14/20 semibold foreground; hover ink-heading, no underline.
        'group/accordion-trigger relative flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-body-sm font-semibold text-foreground transition-colors duration-(--pl-duration-fast) ease-out hover:text-ink-heading',
        'outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring',
        'aria-disabled:pointer-events-none aria-disabled:opacity-(--pl-opacity-disabled) data-[disabled]:pointer-events-none data-[disabled]:opacity-(--pl-opacity-disabled)',
        props.class,
      )"
    >
      <slot />
      <slot name="icon">
        <!-- Playlog: one chevron-down that turns 180° when open, at --pl-duration-fast. -->
        <Icon
          name="chevron-down"
          data-slot="accordion-trigger-icon"
          class="pointer-events-none mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-(--pl-duration-fast) ease-out group-aria-expanded/accordion-trigger:rotate-180"
        />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>
