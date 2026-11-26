<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import type { SeriesVisibility } from "./utils"

defineProps<{
  items: { key: string; label: string; color: string }[]
  visibility?: SeriesVisibility
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <!-- Playlog: above the plot, left aligned, 12/16 medium muted. Interactive (default): each item is a button (aria-pressed,
       radius 4, accent on hover, focus ring); hover or focus dims the other series to 30%; press hides or shows the series. -->
  <div
    data-slot="chart-legend"
    role="group"
    aria-label="Series"
    :class="cn('flex flex-wrap items-center justify-start text-caption text-muted-foreground pb-3', visibility ? 'gap-1' : 'gap-4', $props.class)"
  >
    <template v-for="item in items" :key="item.key">
      <button
        v-if="visibility"
        type="button"
        :aria-pressed="!visibility.isHidden(item.key)"
        :class="
          cn(
            'flex cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-0.5 transition-colors duration-(--pl-duration-fast) ease-out outline-none hover:bg-accent hover:text-accent-foreground focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring',
            visibility.isHidden(item.key) && 'opacity-(--pl-opacity-disabled)',
          )
        "
        @click="visibility.toggle(item.key)"
        @mouseenter="visibility.setActive(item.key)"
        @mouseleave="visibility.setActive(null)"
        @focus="visibility.setActive(item.key)"
        @blur="visibility.setActive(null)"
      >
        <!-- Playlog: 10px swatch, 2px radius, 6px to its label. -->
        <span class="size-2.5 shrink-0 rounded-sm" :style="{ backgroundColor: item.color }" aria-hidden="true" />
        <span :class="cn(visibility.isHidden(item.key) && 'line-through')">{{ item.label }}</span>
      </button>
      <div v-else class="flex items-center gap-1.5">
        <span class="size-2.5 shrink-0 rounded-sm" :style="{ backgroundColor: item.color }" aria-hidden="true" />
        {{ item.label }}
      </div>
    </template>
  </div>
</template>
