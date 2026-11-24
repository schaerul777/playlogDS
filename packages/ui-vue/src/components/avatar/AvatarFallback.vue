<script setup lang="ts">
import type { AvatarFallbackProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { AvatarFallback } from "reka-ui"

const props = defineProps<AvatarFallbackProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
</script>

<template>
  <AvatarFallback
    data-slot="avatar-fallback"
    v-bind="delegatedProps"
    :class="cn(
      // Playlog: initials in ink-heading on accent, 12/16 semibold (lg 14/20).
      'flex size-full items-center justify-center rounded-(--pl-radius-full) bg-accent text-caption font-semibold text-ink-heading group-data-[size=lg]/avatar:text-label',
      props.class,
    )"
  >
    <slot />
  </AvatarFallback>
</template>
