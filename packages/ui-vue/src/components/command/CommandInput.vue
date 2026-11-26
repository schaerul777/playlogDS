<script setup lang="ts">
import type { ListboxFilterProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { ListboxFilter, useForwardProps } from "reka-ui"
import { useCommand } from "."

defineOptions({ inheritAttrs: false })

const props = defineProps<ListboxFilterProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
const forwardedProps = useForwardProps(delegatedProps)

const { filterState } = useCommand()
</script>

<template>
  <!-- Playlog: search row 48 high, padding 0 12, gap 8, 1px border below; no field border. -->
  <div data-slot="command-input-wrapper" class="flex h-12 shrink-0 items-center gap-2 border-b-(length:--pl-border-width) border-border px-3">
    <Icon name="search" class="size-4 shrink-0 text-muted-foreground" />
    <ListboxFilter
      v-bind="{ ...forwardedProps, ...$attrs }"
      v-model="filterState.search"
      data-slot="command-input"
      :class="cn('h-full w-full min-w-0 bg-transparent text-body-sm text-foreground outline-none placeholder:text-muted-foreground disabled:pointer-events-none disabled:opacity-(--pl-opacity-disabled)', props.class)"
    />
  </div>
</template>
