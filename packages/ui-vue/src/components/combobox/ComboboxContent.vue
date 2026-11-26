<script setup lang="ts">
import type { ComboboxContentEmits, ComboboxContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { ComboboxContent, ComboboxPortal, useForwardPropsEmits } from "reka-ui"

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<ComboboxContentProps & { class?: HTMLAttributes["class"] }>(),
  { position: "popper", side: "bottom", align: "start", sideOffset: 4, collisionPadding: 5 },
)
const emits = defineEmits<ComboboxContentEmits>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ComboboxPortal>
    <ComboboxContent
      data-slot="combobox-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          // Playlog: as the Select popup. surface-raised, radius 4, overlay shadow, no border, min width 144.
          // Playlog: fade only at --pl-duration-fast (no zoom or slide).
          'group/combobox-content relative isolate z-50 max-h-(--reka-combobox-content-available-height) w-(--reka-combobox-trigger-width) max-w-(--reka-combobox-content-available-width) min-w-36 origin-(--reka-combobox-content-transform-origin) overflow-hidden rounded-md bg-popover text-popover-foreground shadow-(--pl-shadow-overlay) duration-(--pl-duration-fast) ease-out data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          props.class,
        )
      "
    >
      <slot />
    </ComboboxContent>
  </ComboboxPortal>
</template>
