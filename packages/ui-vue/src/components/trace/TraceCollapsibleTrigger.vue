<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { CollapsibleTrigger } from "@workspace/ui-vue/components/collapsible"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import TraceIcon from "./TraceIcon.vue"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <CollapsibleTrigger
    data-slot="trace-collapsible-trigger"
    :class="
      cn(
        'group/trace-collapsible-trigger flex w-fit max-w-full min-w-0 cursor-pointer items-center gap-1 rounded-md text-left text-muted-foreground transition-colors duration-(--pl-duration-fast) ease-out outline-none hover:text-foreground focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring has-[[data-status=error]]:text-danger-text',
        props.class,
      )
    "
  >
    <slot />
    <!-- Playlog: chevron-right 16 turns 90 degrees when open, at --pl-duration-fast. -->
    <TraceIcon class="transition-transform duration-(--pl-duration-fast) ease-out group-aria-expanded/trace-collapsible-trigger:rotate-90">
      <Icon name="chevron-right" />
    </TraceIcon>
  </CollapsibleTrigger>
</template>
