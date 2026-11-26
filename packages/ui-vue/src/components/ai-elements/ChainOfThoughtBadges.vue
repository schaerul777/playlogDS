<script setup lang="ts">
import { Badge } from "@workspace/ui-vue/components/badge"

// Hostnames or file names as Badge `secondary` (radius 2), wrapping.
defineProps<{ items: string[] }>()
</script>

<template>
  <div class="flex flex-wrap gap-1.5">
    <Badge v-for="item in items" :key="item" variant="secondary">{{ item }}</Badge>
  </div>
</template>
