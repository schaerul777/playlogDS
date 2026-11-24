<script setup lang="ts">
import type { ListboxGroupProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { ListboxGroup, ListboxGroupLabel, useId } from "reka-ui"
import { computed, onMounted, onUnmounted } from "vue"
import { provideCommandGroupContext, useCommand } from "."

const props = defineProps<ListboxGroupProps & {
  class?: HTMLAttributes["class"]
  heading?: string
}>()

const { allGroups, filterState } = useCommand()
const id = useId()

const isRender = computed(() => !filterState.search ? true : filterState.filtered.groups.has(id))

provideCommandGroupContext({ id })
onMounted(() => {
  if (!allGroups.value.has(id))
    allGroups.value.set(id, new Set())
})
onUnmounted(() => {
  allGroups.value.delete(id)
})
</script>

<template>
  <ListboxGroup
    v-bind="{ as: props.as, asChild: props.asChild }"
    :id="id"
    data-slot="command-group"
    :class="cn('overflow-hidden', props.class)"
    :hidden="isRender ? undefined : true"
  >
    <!-- Playlog: as the menu label. 12/16 medium muted-foreground, padding 6 8. -->
    <ListboxGroupLabel v-if="heading" data-slot="command-group-heading" class="px-2 py-1.5 text-caption text-muted-foreground">
      {{ heading }}
    </ListboxGroupLabel>
    <slot />
  </ListboxGroup>
</template>
