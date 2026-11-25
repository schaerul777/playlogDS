<script setup lang="ts">
import type { ScrollAreaRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed, onBeforeUnmount, onMounted, ref } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { ScrollAreaCorner, ScrollAreaRoot, ScrollAreaViewport } from "reka-ui"
import ScrollBar from "./ScrollBar.vue"

// Playlog: "auto" mounts the bar only while the content overflows (Base UI's behavior); Reka defaults to "hover".
const props = withDefaults(defineProps<ScrollAreaRootProps & { class?: HTMLAttributes["class"] }>(), {
  type: "auto",
})

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})

// Playlog: Base UI sets data-scrolling on the bar while the content scrolls and makes the viewport focusable (tabindex 0)
// while it overflows (tabindex -1 otherwise), so arrow keys and Page Up/Down scroll it. Reka does neither; both are added here.
const viewport = ref<InstanceType<typeof ScrollAreaViewport> | null>(null)
const scrolling = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined
let observer: ResizeObserver | undefined

function measure() {
  const el = viewport.value?.viewportElement as HTMLElement | undefined
  if (!el) return
  const overflowing = el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth
  // Reka always renders tabindex="0" on the viewport (and it wins over attributes we pass), so set it on the element.
  el.setAttribute("tabindex", overflowing ? "0" : "-1")
}
function onScroll() {
  scrolling.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (scrolling.value = false), 500)
}
onMounted(() => {
  const el = viewport.value?.viewportElement as HTMLElement | undefined
  if (!el) return
  measure()
  observer = new ResizeObserver(measure)
  observer.observe(el)
  if (el.firstElementChild) observer.observe(el.firstElementChild)
})
onBeforeUnmount(() => {
  observer?.disconnect()
  clearTimeout(timer)
})
</script>

<template>
  <ScrollAreaRoot
    data-slot="scroll-area"
    :data-scrolling="scrolling ? '' : undefined"
    v-bind="delegatedProps"
    :class="cn('group/scroll-area relative', props.class)"
  >
    <ScrollAreaViewport
      ref="viewport"
      data-slot="scroll-area-viewport"
      class="size-full rounded-[inherit] outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring"
      @scroll="onScroll"
    >
      <slot />
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
