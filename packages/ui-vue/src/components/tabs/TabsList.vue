<script setup lang="ts">
import type { TabsListProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { TabsListVariants } from "."
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { TabsList } from "reka-ui"
import { tabsListVariants } from "."

const props = withDefaults(
  defineProps<TabsListProps & { class?: HTMLAttributes["class"]; variant?: TabsListVariants["variant"] }>(),
  { variant: "default" },
)
</script>

<template>
  <TabsList
    data-slot="tabs-list"
    :data-variant="variant"
    :loop="props.loop"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn(tabsListVariants({ variant }), props.class)"
  >
    <slot />
  </TabsList>
</template>
