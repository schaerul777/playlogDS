<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { Button } from "@workspace/ui-vue/components/button"
import { Icon } from "@workspace/ui-vue/icons"
import { useSidebar } from "./utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { toggleSidebar } = useSidebar()
</script>

<template>
  <Button
    data-sidebar="trigger"
    data-slot="sidebar-trigger"
    variant="ghost"
    size="icon-sm"
    :class="cn(props.class)"
    @click="toggleSidebar"
  >
    <Icon name="sidebar" />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
