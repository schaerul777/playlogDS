<script setup lang="ts">
import type { ToggleGroupRootEmits, ToggleGroupRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ToggleVariants } from "@workspace/ui-vue/components/toggle"
import { computed, provide } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { ToggleGroupRoot, useForwardPropsEmits } from "reka-ui"
import { toggleGroupKey } from "./context"

const props = withDefaults(
  defineProps<ToggleGroupRootProps & { class?: HTMLAttributes["class"]; variant?: ToggleVariants["variant"]; size?: ToggleVariants["size"]; spacing?: number }>(),
  { spacing: 0, orientation: "horizontal" }, // Playlog: joined by default (agreed).
)
const emits = defineEmits<ToggleGroupRootEmits>()

provide(toggleGroupKey, computed(() => ({ variant: props.variant, size: props.size, spacing: props.spacing })))

const delegatedProps = computed(() => {
  const { class: _class, size: _size, variant: _variant, spacing: _spacing, ...delegated } = props
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ToggleGroupRoot
    v-slot="slotProps"
    data-slot="toggle-group"
    :data-size="size"
    :data-variant="variant"
    :data-spacing="spacing"
    :style="{ '--gap': spacing }"
    v-bind="forwarded"
    :class="
      cn(
        // Playlog: COMPONENT-SPECS Toggle Group. spacing 0 joins the items (one outer radius 4); spacing n puts them n steps apart.
        'group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-md data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
        props.class,
      )
    "
  >
    <slot v-bind="slotProps" />
  </ToggleGroupRoot>
</template>
