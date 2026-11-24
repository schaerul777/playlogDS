<script setup lang="ts">
import type { MenubarSubContentEmits, MenubarSubContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { MenubarPortal, MenubarSubContent, useForwardPropsEmits } from "reka-ui"

defineOptions({ inheritAttrs: false })

// Playlog: alignOffset -4 (the popup padding) lines the first item up with the submenu trigger.
const props = withDefaults(defineProps<MenubarSubContentProps & { class?: HTMLAttributes["class"] }>(), {
  alignOffset: -4,
  sideOffset: 0,
  collisionPadding: 5,
})
const emits = defineEmits<MenubarSubContentEmits>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <MenubarPortal>
    <MenubarSubContent
      data-slot="menubar-sub-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          'z-50 max-h-(--reka-menubar-content-available-height) min-w-36 origin-(--reka-menubar-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md bg-popover p-1 text-popover-foreground shadow-(--pl-shadow-overlay) outline-none duration-(--pl-duration-fast) ease-out data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          'w-auto',
          props.class,
        )
      "
    >
      <slot />
    </MenubarSubContent>
  </MenubarPortal>
</template>
