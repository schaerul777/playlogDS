<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { Button } from "@workspace/ui-vue/components/button"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { DialogClose, DialogContent, DialogPortal, useForwardPropsEmits } from "reka-ui"
import SheetOverlay from "./SheetOverlay.vue"

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<
    DialogContentProps & { class?: HTMLAttributes["class"]; side?: "top" | "right" | "bottom" | "left"; showCloseButton?: boolean }
  >(),
  { side: "right", showCloseButton: true },
)
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = computed(() => {
  const { class: _class, side: _side, showCloseButton: _show, ...delegated } = props
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <SheetOverlay />
    <DialogContent
      data-slot="sheet-content"
      :data-side="side"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          // Playlog: COMPONENT-SPECS Sheet. Edge-attached, radius 0, no border (shadow only). 75% wide, max 384 from sm.
          // Slides in from its edge by its full size at --pl-duration-slow. (Reka: keyframes, not data-starting-style.)
          'fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-body-sm text-popover-foreground shadow-(--pl-shadow-overlay) duration-(--pl-duration-slow) ease-out data-[state=open]:animate-in data-[state=closed]:animate-out',
          side === 'right' &&
            'inset-y-0 right-0 h-full w-3/4 data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right sm:max-w-sm',
          side === 'left' &&
            'inset-y-0 left-0 h-full w-3/4 data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left sm:max-w-sm',
          side === 'top' && 'inset-x-0 top-0 h-auto data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top',
          side === 'bottom' &&
            'inset-x-0 bottom-0 h-auto data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
          props.class,
        )
      "
    >
      <slot />
      <DialogClose v-if="showCloseButton" as-child>
        <Button data-slot="sheet-close" variant="ghost" size="icon-sm" class="absolute top-4 right-4">
          <Icon name="close" />
          <span class="sr-only">Close</span>
        </Button>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
