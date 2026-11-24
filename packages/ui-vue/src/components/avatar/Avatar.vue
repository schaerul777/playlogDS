<script setup lang="ts">
import type { AvatarRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { AvatarRoot } from "reka-ui"

const props = withDefaults(defineProps<AvatarRootProps & {
  class?: HTMLAttributes["class"]
  size?: "default" | "sm" | "lg"
}>(), {
  size: "default",
})

const delegatedProps = computed(() => {
  const { class: _class, size: _size, ...delegated } = props
  return delegated
})
</script>

<template>
  <AvatarRoot
    data-slot="avatar"
    :data-size="size"
    v-bind="delegatedProps"
    :class="cn(
      // Playlog: COMPONENT-SPECS Avatar. Circle (brand rule), sm 24 / default 32 / lg 40.
      'group/avatar relative flex size-8 shrink-0 rounded-(--pl-radius-full) select-none data-[size=lg]:size-10 data-[size=sm]:size-6',
      props.class,
    )"
  >
    <slot />
  </AvatarRoot>
</template>
