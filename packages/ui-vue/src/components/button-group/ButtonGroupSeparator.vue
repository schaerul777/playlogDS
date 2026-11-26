<script setup lang="ts">
// Playlog: 1px divider in the page colour between filled buttons (default, secondary, destructive). Outline groups do
// not need it: their buttons share one --input edge.
import type { SeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { Separator } from "@workspace/ui-vue/components/separator"

const props = withDefaults(defineProps<SeparatorProps & { class?: HTMLAttributes["class"] }>(), {
  orientation: "vertical",
})

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
</script>

<template>
  <Separator
    data-slot="button-group-separator"
    v-bind="delegatedProps"
    :class="cn(
      'relative self-stretch bg-background data-[orientation=horizontal]:w-auto data-[orientation=vertical]:h-auto',
      props.class,
    )"
  />
</template>
