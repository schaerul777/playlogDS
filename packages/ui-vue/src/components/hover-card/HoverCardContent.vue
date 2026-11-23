<script setup lang="ts">
import type { HoverCardContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { HoverCardContent, HoverCardPortal, useForwardProps } from "reka-ui"

defineOptions({ inheritAttrs: false })

// Playlog: no cross-axis nudge; collisionPadding 5 is the Base UI default (Reka's is 0).
const props = withDefaults(defineProps<HoverCardContentProps & { class?: HTMLAttributes["class"] }>(), {
  side: "bottom",
  sideOffset: 4,
  align: "center",
  alignOffset: 0,
  collisionPadding: 5,
})

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <HoverCardPortal>
    <HoverCardContent
      data-slot="hover-card-content"
      v-bind="{ ...$attrs, ...forwardedProps }"
      :class="
        cn(
          // Playlog: COMPONENT-SPECS Hover Card. The Popover surface: radius 4 (anchored), padding 16,
          // overlay shadow, no border; width 256. Fade only at --pl-duration-fast.
          'z-50 w-64 origin-(--reka-hover-card-content-transform-origin) rounded-md bg-popover p-4 text-body-sm text-popover-foreground shadow-(--pl-shadow-overlay) outline-hidden duration-(--pl-duration-fast) ease-out data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          props.class,
        )
      "
    >
      <slot />
    </HoverCardContent>
  </HoverCardPortal>
</template>
