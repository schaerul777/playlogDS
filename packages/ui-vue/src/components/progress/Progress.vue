<script setup lang="ts">
import type { ProgressRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed, ref } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { ProgressRoot } from "reka-ui"
import ProgressIndicator from "./ProgressIndicator.vue"
import ProgressTrack from "./ProgressTrack.vue"
import { provideProgressContext } from "./context"

const props = withDefaults(defineProps<ProgressRootProps & { class?: HTMLAttributes["class"] }>(), {
  max: 100,
})

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})

const labelId = ref<string>()
const percent = computed(() =>
  props.modelValue == null ? null : Math.min(100, Math.max(0, (props.modelValue / props.max) * 100)),
)
provideProgressContext({ percent, labelId })
</script>

<template>
  <ProgressRoot
    data-slot="progress"
    v-bind="delegatedProps"
    :aria-labelledby="labelId"
    :aria-valuetext="percent == null ? undefined : `${Math.round(percent)}%`"
    :class="cn(
      // Playlog: COMPONENT-SPECS Progress. Label left and value right, 8 above the track.
      'flex flex-wrap items-baseline gap-x-3 gap-y-2',
      props.class,
    )"
  >
    <slot />
    <ProgressTrack>
      <ProgressIndicator />
    </ProgressTrack>
  </ProgressRoot>
</template>
