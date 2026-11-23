<script setup lang="ts">
import type { ToggleGroupItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ToggleVariants } from "@workspace/ui-vue/components/toggle"
import { computed, inject } from "vue"
import { toggleVariants } from "@workspace/ui-vue/components/toggle"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { ToggleGroupItem, useForwardProps } from "reka-ui"
import { toggleGroupKey } from "./context"

const props = withDefaults(
  defineProps<ToggleGroupItemProps & { class?: HTMLAttributes["class"]; variant?: ToggleVariants["variant"]; size?: ToggleVariants["size"] }>(),
  { variant: "default", size: "default" },
)

const context = inject(toggleGroupKey, undefined)

const delegatedProps = computed(() => {
  const { class: _class, size: _size, variant: _variant, ...delegated } = props
  return delegated
})
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <ToggleGroupItem
    v-slot="slotProps"
    data-slot="toggle-group-item"
    :data-variant="context?.variant || variant"
    :data-size="context?.size || size"
    :data-spacing="context?.spacing"
    v-bind="forwardedProps"
    :class="
      cn(
        // Playlog: joined items: inner corners square, outline items share 1px --input dividers. Focused item sits above its neighbours.
        'shrink-0 focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:rounded-(--pl-radius-0)',
        'group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:first:rounded-l-md group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:last:rounded-r-md group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:first:rounded-t-md group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:last:rounded-b-md',
        'group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l-(length:--pl-border-width) group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t-(length:--pl-border-width)',
        toggleVariants({ variant: context?.variant || variant, size: context?.size || size }),
        props.class,
      )
    "
  >
    <slot v-bind="slotProps" />
  </ToggleGroupItem>
</template>
