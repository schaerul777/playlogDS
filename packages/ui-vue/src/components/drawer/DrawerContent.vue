<script setup lang="ts">
import type { DrawerContentEmits, DrawerContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { Button } from "@workspace/ui-vue/components/button"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { DrawerClose, DrawerContent, DrawerViewport, useForwardPropsEmits } from "reka-ui"
import { injectDrawerContext } from "./context"
import DrawerOverlay from "./DrawerOverlay.vue"
import DrawerPortal from "./DrawerPortal.vue"
import DrawerSwipeHandle from "./DrawerSwipeHandle.vue"

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<DrawerContentProps & { class?: HTMLAttributes["class"]; showCloseButton?: boolean }>(), {
  showCloseButton: true,
})
const emits = defineEmits<DrawerContentEmits>()

const ctx = injectDrawerContext()

const delegatedProps = computed(() => {
  const { class: _class, showCloseButton: _show, ...delegated } = props
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)

// Playlog: on open the popup itself takes focus, like the React Drawer (Reka would focus the first control and select its text).
// Pass @open-auto-focus and call preventDefault() to choose another element.
function onOpenAutoFocus(event: Event) {
  if (event.defaultPrevented) return // the forwarded emit already ran, so a user handler could have prevented it
  event.preventDefault()
  ;(event.target as HTMLElement | null)?.focus({ preventScroll: true })
}
</script>

<template>
  <DrawerPortal>
    <!-- Reka renders the overlay only when the drawer is modal. -->
    <DrawerOverlay :data-snap-points="ctx.hasSnapPoints() ? '' : undefined" />
    <DrawerViewport data-slot="drawer-viewport" class="pointer-events-none fixed inset-0 z-50 select-none data-[state=open]:pointer-events-auto">
      <DrawerContent
        data-slot="drawer-popup"
        :data-snap-points="ctx.hasSnapPoints() ? '' : undefined"
        v-bind="{ ...$attrs, ...forwarded }"
        tabindex="-1"
        @open-auto-focus="onOpenAutoFocus"
        :class="
          cn(
            // Playlog: surface as Sheet (popover fill, overlay shadow, no border); radius 8 on the top corners; full width,
            // at most the viewport minus 48 high.
            'group/drawer-popup pointer-events-auto fixed inset-x-0 bottom-0 z-50 flex h-(--drawer-content-height) max-h-[calc(100dvh-3rem)] min-h-0 flex-col rounded-t-lg bg-popover text-body-sm text-popover-foreground shadow-(--pl-shadow-overlay) outline-none select-none',
            '[--drawer-content-height:var(--drawer-height,auto)] data-snap-points:[--drawer-content-height:100dvh]',
            // Playlog: slides in from the bottom at --pl-duration-slow; no transition while dragging; follows the swipe.
            // (Reka: keyframes, not data-starting-style / data-ending-style.)
            'origin-bottom transform-[translate3d(0,var(--translate-y,0px),0)] transition-[transform,height] duration-(--pl-duration-slow) ease-out will-change-transform [interpolate-size:allow-keywords] [--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y))]',
            'data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-swiping:duration-0',
            // Playlog: keeps the panel edge covered while it is dragged past the bottom.
            'after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-12 after:bg-popover',
            props.class,
          )
        "
      >
        <DrawerSwipeHandle v-if="ctx.showSwipeHandle()" />
        <!-- Playlog: 16 between header, body and footer (as Sheet). -->
        <div
          data-slot="drawer-content"
          class="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden overscroll-contain rounded-[inherit] select-text group-data-swiping/drawer-popup:select-none"
        >
          <slot />
        </div>
        <DrawerClose v-if="showCloseButton" as-child>
          <Button data-slot="drawer-close" variant="ghost" size="icon-sm" class="absolute top-4 right-4 z-20">
            <Icon name="close" />
            <span class="sr-only">Close</span>
          </Button>
        </DrawerClose>
      </DrawerContent>
    </DrawerViewport>
  </DrawerPortal>
</template>
