<script setup lang="ts">
import type { SeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { Separator } from "reka-ui"

const props = defineProps<SeparatorProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <Separator
    data-slot="command-separator"
    :as="props.as"
    :as-child="props.asChild"
    :orientation="props.orientation"
    :decorative="props.decorative"
    :class="cn('-mx-1 my-1 h-(--pl-border-width) bg-border', props.class)"
  >
    <slot />
  </Separator>
</template>
