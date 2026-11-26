<script setup lang="ts">
import type { SelectGroupProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { SelectGroup } from "reka-ui"

const props = defineProps<SelectGroupProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <SelectGroup data-slot="select-group" :as="props.as" :as-child="props.asChild" :class="cn('scroll-my-1 p-1', props.class)">
    <slot />
  </SelectGroup>
</template>
