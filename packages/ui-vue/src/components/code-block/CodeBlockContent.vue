<script setup lang="ts">
import type { HTMLAttributes, VNode } from "vue"
import { computed, h, Text, useSlots } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import CodeBlockLine from "./CodeBlockLine.vue"

const props = withDefaults(defineProps<{ wrap?: boolean; lineNumbers?: boolean; startLine?: number; class?: HTMLAttributes["class"] }>(), {
  wrap: false,
  lineNumbers: false,
  startLine: 1,
})
const slots = useSlots()
const style = computed(() => ({ counterReset: `line ${props.startLine - 1}` }))

// With `lineNumbers`, a plain string child is split into one line per row.
// The slot is read in this component's own render (the template calls body()), so a changed slot re-renders it.
function body() {
  const nodes = slots.default?.() ?? []
  if (props.lineNumbers && nodes.length === 1 && nodes[0].type === Text && typeof nodes[0].children === "string") {
    return nodes[0].children.replace(/\n$/, "").split("\n").map((line, i) => h(CodeBlockLine, { key: i }, () => line))
  }
  return nodes
}
const Render = (p: { nodes: VNode[] }) => p.nodes
</script>

<template>
  <!-- Playlog: Reddit Mono, 14/20 weight 400 (sm: 12/16), padding 16 (sm: 12), thin scrollbar as Message Scroller. -->
  <pre
    data-slot="code-block-content"
    :data-wrap="wrap || undefined"
    :data-numbered="lineNumbers || undefined"
    dir="ltr"
    tabindex="0"
    :style="style"
    :class="
      cn(
        'min-h-0 min-w-0 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent overflow-auto p-4 text-start font-mono text-body-sm font-normal outline-none group-data-[size=sm]/code-block:p-3 group-data-[size=sm]/code-block:text-caption group-data-[size=sm]/code-block:font-normal group-has-data-[slot=code-block-footer]/code-block:pb-2 group-has-data-[slot=code-block-header]/code-block:pt-2 group-data-[size=sm]/code-block:group-has-data-[slot=code-block-header]/code-block:pt-1.5 data-wrap:wrap-break-word data-wrap:whitespace-pre-wrap',
        props.class,
      )
    "
  ><code data-slot="code-block-code" class="grid min-h-lh min-w-max content-start in-data-numbered:grid-cols-[auto_1fr] in-data-wrap:min-w-0"><Render :nodes="body()" /></code></pre>
</template>
