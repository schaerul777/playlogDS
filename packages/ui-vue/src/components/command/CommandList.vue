<script setup lang="ts">
import type { ListboxContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { ListboxContent, useForwardProps } from "reka-ui"

const props = defineProps<ListboxContentProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <!-- Playlog: padding 4, max height 288. -->
  <ListboxContent
    data-slot="command-list"
    v-bind="forwarded"
    :class="cn('max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto overscroll-contain p-1 outline-none', props.class)"
  >
    <div role="presentation">
      <slot />
    </div>
  </ListboxContent>
</template>
