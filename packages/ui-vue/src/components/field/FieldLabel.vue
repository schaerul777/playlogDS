<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Label } from "@workspace/ui-vue/components/label"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

const props = defineProps<{ class?: HTMLAttributes["class"]; for?: string }>()
</script>

<template>
  <Label
    data-slot="field-label"
    :for="props.for"
    :class="
      cn(
        'group/field-label peer/field-label flex w-fit gap-2 group-data-[disabled=true]/field:opacity-(--pl-opacity-disabled)',
        // Playlog: choice card (a FieldLabel wrapping a Field). card fill, 1px border, radius 4, padding 12 16;
        // checked uses surface-selected with a primary border; the focus ring goes on the card. (Reka: data-state=checked.)
        'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border-(length:--pl-border-width) has-[>[data-slot=field]]:border-border has-[>[data-slot=field]]:bg-card has-[>[data-slot=field]]:transition-colors has-[>[data-slot=field]]:duration-(--pl-duration-fast) has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-accent *:data-[slot=field]:px-4 *:data-[slot=field]:py-3',
        'has-[>[data-slot=field]]:has-[[data-state=checked]]:border-primary has-[>[data-slot=field]]:has-[[data-state=checked]]:bg-surface-selected',
        'has-[>[data-slot=field]]:has-[:focus-visible]:outline-(length:--pl-focus-ring-width) has-[>[data-slot=field]]:has-[:focus-visible]:outline-offset-(--pl-focus-ring-offset) has-[>[data-slot=field]]:has-[:focus-visible]:outline-solid has-[>[data-slot=field]]:has-[:focus-visible]:outline-ring',
        props.class,
      )
    "
  >
    <slot />
  </Label>
</template>
