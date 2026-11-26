<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: 24 square with the `more` glyph. Wrap it in a DropdownMenuTrigger to list the hidden items. -->
  <span data-slot="breadcrumb-ellipsis" role="presentation" aria-hidden="true" :class="cn('flex size-6 items-center justify-center [&>svg]:size-4', props.class)">
    <Icon name="more" />
    <span class="sr-only">More</span>
  </span>
</template>
