<script setup lang="ts">
import type { MenubarContentEmits, MenubarContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { MenubarContent, MenubarPortal, useForwardPropsEmits } from "reka-ui"

defineOptions({ inheritAttrs: false })

// Playlog: the Dropdown Menu popup as is. alignOffset -4 and sideOffset 8 line the popup up with the bar (4 padding).
// collisionPadding 5 is the Base UI default (Reka's is 0).
const props = withDefaults(defineProps<MenubarContentProps & { class?: HTMLAttributes["class"] }>(), { align: "start", alignOffset: -4, side: "bottom", sideOffset: 8, collisionPadding: 5 })
const emits = defineEmits<MenubarContentEmits>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <MenubarPortal>
    <MenubarContent
      data-slot="menubar-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          // Playlog: menu popup as the Select popup. Surface-raised with the overlay shadow, radius 4, padding 4,
          // min width 144, no border. Fade only at --pl-duration-fast (no zoom or slide).
          'z-50 max-h-(--reka-menubar-content-available-height) min-w-36 origin-(--reka-menubar-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md bg-popover p-1 text-popover-foreground shadow-(--pl-shadow-overlay) outline-none duration-(--pl-duration-fast) ease-out data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 w-(--reka-menubar-trigger-width)',
          props.class,
        )
      "
    >
      <slot />
    </MenubarContent>
  </MenubarPortal>
</template>
