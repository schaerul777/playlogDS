<script setup lang="ts">
import type { PopoverContentEmits, PopoverContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { PopoverContent, PopoverPortal, useForwardPropsEmits } from "reka-ui"

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PopoverContentProps & { class?: HTMLAttributes["class"] }>(), {
  align: "center",
  side: "bottom",
  sideOffset: 4,
  collisionPadding: 5, // Playlog: Base UI's default; Reka's is 0.
})
const emits = defineEmits<PopoverContentEmits>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <PopoverPortal>
    <PopoverContent
      data-slot="popover-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          // Playlog: COMPONENT-SPECS Popover. Anchored, so radius 4. Padding 16, gap 12, width 288,
          // surface-raised with the overlay shadow, no border. Fade only at --pl-duration-fast.
          'z-50 flex w-72 origin-(--reka-popover-content-transform-origin) flex-col gap-3 rounded-md bg-popover p-4 text-body-sm text-popover-foreground shadow-(--pl-shadow-overlay) outline-hidden duration-(--pl-duration-fast) ease-out data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          props.class,
        )
      "
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
