<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: chevron-right 16 in muted-foreground. -->
  <li data-slot="breadcrumb-separator" role="presentation" aria-hidden="true" :class="cn('flex text-muted-foreground [&>svg]:size-4', props.class)">
    <slot>
      <Icon name="chevron-right" />
    </slot>
  </li>
</template>
