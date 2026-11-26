<script setup lang="ts">
import { onMounted, ref } from "vue"

// Playlog: as in React (Base UI), a menubar menu opened with the mouse takes focus, so the arrow keys work at once.
// Reka only focuses the menu when it was opened from the keyboard. This marker mounts with the open menu.
const marker = ref<HTMLElement | null>(null)
onMounted(() => {
  requestAnimationFrame(() => {
    const menu = marker.value?.closest<HTMLElement>("[role=menu]")
    if (menu && !menu.contains(document.activeElement)) menu.focus()
  })
})
</script>

<template>
  <span ref="marker" hidden />
</template>
