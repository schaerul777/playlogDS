<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div
    data-slot="input-group"
    role="group"
    :class="
      cn(
        // Playlog: COMPONENT-SPECS Input Group. Looks like Input: 40 high, card fill, 1px --input border, radius 4, flat.
        'group/input-group relative flex h-10 w-full min-w-0 items-center rounded-md border-(length:--pl-border-width) border-input bg-card text-body-sm transition-colors duration-(--pl-duration-fast) ease-out hover:border-foreground',
        // Playlog: the focus ring goes on the wrapper while its control has focus.
        'has-[[data-slot=input-group-control]:focus-visible]:outline-(length:--pl-focus-ring-width) has-[[data-slot=input-group-control]:focus-visible]:outline-offset-(--pl-focus-ring-offset) has-[[data-slot=input-group-control]:focus-visible]:outline-solid has-[[data-slot=input-group-control]:focus-visible]:outline-ring',
        // Playlog: invalid edge pl-danger-text; disabled dims the whole group.
        'has-[[data-slot][aria-invalid=true]]:border-danger-text has-[[data-slot=input-group-control]:disabled]:pointer-events-none has-[[data-slot=input-group-control]:disabled]:opacity-(--pl-opacity-disabled)',
        'has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto',
        'has-[>[data-align=inline-end]]:[&>input]:pr-2 has-[>[data-align=inline-start]]:[&>input]:pl-2',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
