<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed, onBeforeUnmount, provide, ref, watch } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from "reka-ui"
import { sliderValuesKey } from "./context"

// Playlog: COMPONENT-SPECS Slider. Track as Progress (muted, 8 high, radius 0); the range is `primary` (a control's fill has
// to read against the track). Thumb 20x20, radius 4, card fill, 2px primary border, 40x40 hit area, focus ring as Switch.
// Single value or range (two thumbs: name them with `thumbLabels`). Optional SliderLabel and SliderValue row as Progress.
const props = defineProps<
  SliderRootProps & {
    class?: HTMLAttributes["class"]
    /** Accessible names for the thumbs, in order, for example ["Minimum price", "Maximum price"]. */
    thumbLabels?: string[]
    ariaLabel?: string
  }
>()
const emits = defineEmits<SliderRootEmits>()

const delegatedProps = computed(() => {
  const { class: _class, thumbLabels: _labels, ariaLabel: _aria, ...delegated } = props
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)

// Playlog: eases at --pl-duration-fast, but not while dragging (it would lag behind the thumb).
const dragging = ref(false)
function stop() {
  dragging.value = false
  window.removeEventListener("pointerup", stop)
  window.removeEventListener("pointercancel", stop)
}
function start() {
  dragging.value = true
  window.addEventListener("pointerup", stop)
  window.addEventListener("pointercancel", stop)
}
onBeforeUnmount(stop)

// Playlog: SliderValue shows the current value(s), for both v-model and uncontrolled use.
const current = ref<number[]>((props.modelValue ?? props.defaultValue ?? [props.min ?? 0]) as number[])
watch(() => props.modelValue, (value) => value && (current.value = value))
provide(sliderValuesKey, computed(() => current.value))
function onUpdate(value: number[] | undefined) {
  if (value) current.value = value
}
</script>

<template>
  <SliderRoot
    v-slot="{ modelValue }"
    data-slot="slider"
    :data-dragging="dragging ? '' : undefined"
    v-bind="forwarded"
    :class="
      cn(
        // Playlog: label on the left and value on the right, 8 above the track (as Progress).
        'group/slider flex flex-wrap items-baseline gap-x-3 gap-y-2 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-col data-[disabled]:pointer-events-none data-[disabled]:opacity-(--pl-opacity-disabled)',
        props.class,
      )
    "
    @pointerdown="start"
    @update:model-value="onUpdate"
  >
    <slot />
    <!-- Playlog: the control is 40 high (the touch target); the track sits in the middle. -->
    <div
      data-slot="slider-control"
      class="relative flex min-h-10 w-full touch-none items-center select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-auto data-[orientation=vertical]:min-w-10 data-[orientation=vertical]:flex-col"
      :data-orientation="props.orientation ?? 'horizontal'"
    >
      <SliderTrack
        data-slot="slider-track"
        class="relative grow overflow-hidden bg-muted select-none data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2"
      >
        <SliderRange
          data-slot="slider-range"
          class="absolute bg-primary select-none group-not-data-[dragging]/slider:transition-[width,height,left,right] group-not-data-[dragging]/slider:duration-(--pl-duration-fast) group-not-data-[dragging]/slider:ease-out data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
        />
      </SliderTrack>
      <SliderThumb
        v-for="(_, index) in modelValue"
        :key="index"
        data-slot="slider-thumb"
        :aria-label="thumbLabels ? (thumbLabels[index] ?? '') : modelValue && modelValue.length === 1 ? props.ariaLabel : undefined"
        class="relative block size-5 shrink-0 rounded-md border-2 border-primary bg-card transition-colors duration-(--pl-duration-fast) ease-out select-none after:absolute after:-inset-3 hover:bg-accent outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring"
      />
    </div>
  </SliderRoot>
</template>
