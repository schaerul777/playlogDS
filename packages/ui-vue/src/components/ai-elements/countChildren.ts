import { Comment, Fragment, Text, type VNode } from "vue"

// Counts element children in a slot, looking through v-for and fragments (React.Children.count).
export function countChildren(nodes: VNode[] | undefined): number {
  let n = 0
  for (const node of nodes ?? []) {
    if (node.type === Fragment) n += countChildren(node.children as VNode[])
    else if (node.type !== Comment && !(node.type === Text && String(node.children).trim() === "")) n += 1
  }
  return n
}
