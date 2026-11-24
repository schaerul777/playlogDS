<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { computed, onMounted, onUnmounted, ref } from "vue"
import { TooltipProvider } from "@workspace/ui-vue/components/tooltip"
import { provideSidebarContext, SIDEBAR_COOKIE_MAX_AGE, SIDEBAR_COOKIE_NAME, SIDEBAR_KEYBOARD_SHORTCUT, SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON, useIsMobile } from "./utils"

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  defaultOpen?: boolean
  open?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  defaultOpen: true,
  open: undefined, // keeps Vue from casting an absent Boolean prop to false (that would mean "controlled, closed")
})

const emit = defineEmits<{
  "update:open": [open: boolean]
}>()

// Controlled with v-model:open, or uncontrolled from `defaultOpen` (same contract as React `open` / `onOpenChange`).
const internal = ref(props.defaultOpen)
const open = computed({
  get: () => props.open ?? internal.value,
  set: (value: boolean) => {
    internal.value = value
    emit("update:open", value)
  },
})

const isMobile = useIsMobile()
const openMobile = ref(false)

function setOpen(value: boolean) {
  open.value = value

  // This sets the cookie to keep the sidebar state.
  document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
}

function setOpenMobile(value: boolean) {
  openMobile.value = value
}

// Helper to toggle the sidebar.
function toggleSidebar() {
  return isMobile.value ? setOpenMobile(!openMobile.value) : setOpen(!open.value)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
    event.preventDefault()
    toggleSidebar()
  }
}
onMounted(() => window.addEventListener("keydown", onKeydown))
onUnmounted(() => window.removeEventListener("keydown", onKeydown))

// data-state="expanded" or "collapsed" makes the sidebar easy to style with Tailwind classes.
const state = computed(() => (open.value ? "expanded" : "collapsed"))

provideSidebarContext({
  state,
  open,
  setOpen,
  isMobile,
  openMobile,
  setOpenMobile,
  toggleSidebar,
})
</script>

<template>
  <TooltipProvider>
    <div
      data-slot="sidebar-wrapper"
      :style="{
        '--sidebar-width': SIDEBAR_WIDTH,
        '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
      }"
      :class="cn('group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar', props.class)"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </TooltipProvider>
</template>
