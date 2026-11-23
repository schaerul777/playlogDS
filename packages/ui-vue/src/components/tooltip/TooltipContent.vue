<script setup lang="ts">
import type { TooltipContentEmits, TooltipContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { TooltipContent, TooltipPortal, useForwardPropsEmits } from "reka-ui"

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TooltipContentProps & { class?: HTMLAttributes["class"] }>(), {
  side: "top",
  sideOffset: 4,
  align: "center",
  collisionPadding: 5, // Playlog: Base UI's default; Reka's is 0.
})
const emits = defineEmits<TooltipContentEmits>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <TooltipPortal>
    <!-- Playlog: no arrow (agreed). Text only. -->
    <TooltipContent
      data-slot="tooltip-content"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        cn(
          // Playlog: COMPONENT-SPECS Tooltip. Popover surface, radius 4, padding 6 12, overlay shadow, caption text,
          // max 320, no arrow. Fade only at --pl-duration-fast.
          'z-50 inline-flex w-fit max-w-xs origin-(--reka-tooltip-content-transform-origin) items-center gap-1.5 rounded-md bg-popover px-3 py-1.5 text-caption text-popover-foreground shadow-(--pl-shadow-overlay) duration-(--pl-duration-fast) ease-out animate-in fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          props.class,
        )
      "
    >
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>
