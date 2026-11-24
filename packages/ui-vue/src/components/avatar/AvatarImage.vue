<script setup lang="ts">
import type { AvatarImageProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { AvatarImage } from "reka-ui"

const props = defineProps<AvatarImageProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
</script>

<template>
  <AvatarImage
    data-slot="avatar-image"
    v-bind="delegatedProps"
    :class="cn('aspect-square size-full rounded-(--pl-radius-full) object-cover', props.class)"
  />
</template>
