<script setup lang="ts">
import type { SwitchRootEmits, SwitchRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from "reka-ui"

const props = withDefaults(
  defineProps<SwitchRootProps & { class?: HTMLAttributes["class"]; size?: "sm" | "default" }>(),
  { size: "default" }
)
const emits = defineEmits<SwitchRootEmits>()

const delegatedProps = computed(() => {
  const { class: _class, size: _size, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SwitchRoot
    v-slot="slotProps"
    data-slot="switch"
    :data-size="size"
    v-bind="forwarded"
    :class="
      cn(
        // Playlog: fully rounded track (--pl-radius-full), flat, 150ms ease-out.
        // Playlog: sizes on the Tailwind scale: default 36x20 (thumb 16), sm 28x16 (thumb 12), 2px inset.
        'peer group/switch relative inline-flex shrink-0 items-center rounded-(--pl-radius-full) border-(length:--pl-border-width) border-transparent p-px transition-colors duration-(--pl-duration-fast) ease-out after:absolute after:-inset-x-3 after:-inset-y-2 data-[size=default]:h-5 data-[size=default]:w-9 data-[size=sm]:h-4 data-[size=sm]:w-7',
        // Playlog: unchecked track is the control edge colour (--input); checked is primary. (Reka: data-state.)
        'data-[state=unchecked]:bg-input data-[state=unchecked]:hover:bg-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary-hover',
        // Playlog: focus ring from --pl-focus-ring-width / --pl-focus-ring-offset.
        'outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring',
        // Playlog: disabled uses --pl-opacity-disabled.
        'data-disabled:pointer-events-none data-disabled:opacity-(--pl-opacity-disabled)',
        // Playlog: error edge is pl-danger-text; the focus ring stays --ring (COMPONENT-SPECS).
        'aria-invalid:border-danger-text',
        props.class,
      )
    "
  >
    <SwitchThumb
      data-slot="switch-thumb"
      class="pointer-events-none block rounded-(--pl-radius-full) bg-card transition-transform duration-(--pl-duration-fast) ease-out group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 data-[state=checked]:bg-primary-foreground data-[state=unchecked]:translate-x-0 group-data-[size=default]/switch:data-[state=checked]:translate-x-4 group-data-[size=sm]/switch:data-[state=checked]:translate-x-3"
    >
      <slot name="thumb" v-bind="slotProps" />
    </SwitchThumb>
  </SwitchRoot>
</template>
