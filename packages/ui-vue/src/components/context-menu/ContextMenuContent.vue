<script setup lang="ts">
import type { ContextMenuContentEmits, ContextMenuContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { ContextMenuContent, ContextMenuPortal, useForwardPropsEmits } from "reka-ui"

defineOptions({ inheritAttrs: false })

// Playlog: collisionPadding 5 is the Base UI default (Reka's is 0).
const props = withDefaults(defineProps<ContextMenuContentProps & { class?: HTMLAttributes["class"] }>(), { align: "start", alignOffset: 4, side: "right", sideOffset: 0, collisionPadding: 5 })
const emits = defineEmits<ContextMenuContentEmits>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ContextMenuPortal>
    <ContextMenuContent
      data-slot="context-menu-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          // Playlog: menu popup as the Select popup. Surface-raised with the overlay shadow, radius 4, padding 4,
          // min width 144, no border. Fade only at --pl-duration-fast (no zoom or slide).
          'z-50 max-h-(--reka-context-menu-content-available-height) min-w-36 origin-(--reka-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md bg-popover p-1 text-popover-foreground shadow-(--pl-shadow-overlay) outline-none duration-(--pl-duration-fast) ease-out data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          props.class,
        )
      "
    >
      <slot />
    </ContextMenuContent>
  </ContextMenuPortal>
</template>
