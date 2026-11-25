<script setup lang="ts">
import type { SeparatorProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { Separator } from "@workspace/ui-vue/components/separator"

const props = defineProps<SeparatorProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: a 1px border line; the group gap spaces it. -->
  <Separator
    data-slot="item-separator"
    orientation="horizontal"
    :class="cn(props.class)"
  />
</template>
