<script setup lang="ts">
import type { HTMLAttributes, VNode } from "vue"
import type { CodeBlockLineVariants } from "."
import { Comment, Fragment, Text, useSlots } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { codeBlockLineVariants } from "."

const props = withDefaults(defineProps<{ variant?: CodeBlockLineVariants["variant"]; class?: HTMLAttributes["class"] }>(), { variant: "default" })
const slots = useSlots()

function isEmpty(nodes: VNode[]): boolean {
  return nodes.every((n) => n.type === Comment || (n.type === Text && n.children === "") || (n.type === Fragment && Array.isArray(n.children) && isEmpty(n.children as VNode[])))
}
// An empty line holds a newline so copying a selection keeps blank lines.
// The slot is read in this component's own render (the template calls body()), so a changed slot re-renders it.
function body() {
  const nodes = slots.default?.() ?? []
  return isEmpty(nodes) ? "\n" : nodes
}
const Render = (p: { nodes: VNode[] | string }) => p.nodes
</script>

<template>
  <span data-slot="code-block-line" :data-variant="variant" :class="cn(codeBlockLineVariants({ variant }), props.class)">
    <span data-slot="code-block-line-content" class="min-w-0"><Render :nodes="body()" /></span>
  </span>
</template>
