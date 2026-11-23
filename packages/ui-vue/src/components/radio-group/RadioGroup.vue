<script setup lang="ts">
import type { RadioGroupRootEmits, RadioGroupRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed, provide, ref } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { RadioGroupRoot, useForwardPropsEmits } from "reka-ui"
import { radioArrowNavKey } from "./context"

const props = defineProps<RadioGroupRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<RadioGroupRootEmits>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

// Playlog: React (Base UI) selects the radio that arrow keys move to; Reka only moves focus.
// The group notes arrow-key navigation so each item can select itself when it receives that focus.
const arrowNav = ref(false)
provide(radioArrowNavKey, arrowNav)
function onKeydown(event: KeyboardEvent) {
  if (!event.key.startsWith("Arrow")) return
  arrowNav.value = true
  // Focus moves synchronously inside this key event; clear the flag right after it.
  setTimeout(() => (arrowNav.value = false))
}
</script>

<template>
  <!-- Playlog: 12 between items. -->
  <RadioGroupRoot
    v-slot="slotProps"
    data-slot="radio-group"
    :class="cn('grid w-full gap-3', props.class)"
    v-bind="forwarded"
    @keydown.capture="onKeydown"
  >
    <slot v-bind="slotProps" />
  </RadioGroupRoot>
</template>
