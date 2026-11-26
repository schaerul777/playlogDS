<script setup lang="ts">
import type { CollapsibleRootEmits, CollapsibleRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Collapsible } from "@workspace/ui-vue/components/collapsible"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { useForwardPropsEmits } from "reka-ui"
import { computed } from "vue"

// Uncontrolled with `default-open`, or controlled with `v-model:open` (React `open` / `onOpenChange`).
const props = withDefaults(defineProps<CollapsibleRootProps & { class?: HTMLAttributes["class"] }>(), { open: undefined, defaultOpen: undefined })
const emits = defineEmits<CollapsibleRootEmits>()
const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <Collapsible data-slot="trace-collapsible" v-bind="forwarded" :class="cn('flex w-full min-w-0 flex-col', props.class)">
    <slot />
  </Collapsible>
</template>
