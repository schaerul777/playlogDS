<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { TabsRoot, useForwardPropsEmits } from "reka-ui"

const props = withDefaults(defineProps<TabsRootProps & { class?: HTMLAttributes["class"] }>(), { orientation: "horizontal", activationMode: "manual" }) // Playlog: as in React (Base UI), arrow keys move focus and Space or Enter selects.
const emits = defineEmits<TabsRootEmits>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <TabsRoot
    v-slot="slotProps"
    data-slot="tabs"
    v-bind="forwarded"
    :class="cn('group/tabs flex gap-2 data-[orientation=horizontal]:flex-col', props.class)"
  >
    <slot v-bind="slotProps" />
  </TabsRoot>
</template>
