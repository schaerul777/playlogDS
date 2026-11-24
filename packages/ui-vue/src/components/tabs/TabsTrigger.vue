<script setup lang="ts">
import type { TabsTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { TabsTrigger, useForwardProps } from "reka-ui"

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TabsTrigger
    data-slot="tabs-trigger"
    v-bind="forwardedProps"
    :class="
      cn(
        // Playlog: label type (14/20, 600), 2px radius, 150ms ease-out, icons 16px.
        'relative inline-flex h-full flex-1 items-center justify-center gap-1.5 rounded-sm border-(length:--pl-border-width) border-transparent px-3 text-label whitespace-nowrap text-muted-foreground transition-colors duration-(--pl-duration-fast) ease-out group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-ink-heading has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4',
        // Playlog: focus ring from --pl-focus-ring-width / --pl-focus-ring-offset.
        'outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring',
        // Playlog: disabled uses --pl-opacity-disabled.
        'disabled:pointer-events-none disabled:opacity-(--pl-opacity-disabled) data-[disabled]:pointer-events-none data-[disabled]:opacity-(--pl-opacity-disabled) aria-disabled:pointer-events-none aria-disabled:opacity-(--pl-opacity-disabled)',
        // Playlog: selected is surface-selected + ink-heading (default variant). (Reka: data-state=active.)
        'group-data-[variant=default]/tabs-list:data-[state=active]:bg-surface-selected group-data-[variant=default]/tabs-list:data-[state=active]:text-ink-heading',
        // Playlog: line variant follows COMPONENT-SPECS. Padding 10 0 12, no border or radius, hugs its label.
        // Playlog: vertical line tabs (not in the spec) pad 8 16 8 0 so the label clears the row border.
        'group-data-[variant=line]/tabs-list:h-auto group-data-[variant=line]/tabs-list:flex-none group-data-[variant=line]/tabs-list:rounded-(--pl-radius-0) group-data-[variant=line]/tabs-list:border-0 group-data-[variant=line]/tabs-list:px-0 group-data-[variant=line]/tabs-list:pt-2.5 group-data-[variant=line]/tabs-list:pb-3 group-data-[orientation=vertical]/tabs:group-data-[variant=line]/tabs-list:py-2 group-data-[orientation=vertical]/tabs:group-data-[variant=line]/tabs-list:pr-4',
        // Playlog: active line tab has a 2px ink-heading underline sitting on the row border (bottom -1px).
        'group-data-[variant=line]/tabs-list:data-[state=active]:text-ink-heading after:absolute after:bg-ink-heading after:opacity-0 after:transition-opacity after:duration-(--pl-duration-fast) after:ease-out group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:-bottom-px group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-px group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100',
        props.class,
      )
    "
  >
    <slot />
  </TabsTrigger>
</template>
