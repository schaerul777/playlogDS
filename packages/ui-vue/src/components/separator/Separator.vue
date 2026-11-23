<script setup lang="ts">
import type { SeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { Separator } from "reka-ui"

// Playlog: 1px (--pl-border-width) in border. Decorative by default. No built-in margin.
const props = withDefaults(defineProps<SeparatorProps & { class?: HTMLAttributes["class"] }>(), {
  orientation: "horizontal",
  decorative: true,
})

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
</script>

<template>
  <Separator
    data-slot="separator"
    v-bind="delegatedProps"
    :class="
      cn(
        'shrink-0 bg-border data-[orientation=horizontal]:h-(--pl-border-width) data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-(--pl-border-width) data-[orientation=vertical]:self-stretch',
        props.class,
      )
    "
  />
</template>
