<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { Primitive } from "reka-ui"
import { useCommand } from "."

const props = defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>()

const { filterState } = useCommand()
const isRender = computed(() => !!filterState.search && filterState.filtered.count === 0)
</script>

<template>
  <!-- Playlog: "No results" 14/20 muted-foreground, centred, padding 24 12. -->
  <Primitive
    v-if="isRender"
    data-slot="command-empty"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('px-3 py-6 text-center text-body-sm text-muted-foreground', props.class)"
  >
    <slot />
  </Primitive>
</template>
