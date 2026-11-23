<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { InputGroupVariants } from "."
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { inputGroupAddonVariants } from "."

const props = withDefaults(
  defineProps<{ align?: InputGroupVariants["align"]; class?: HTMLAttributes["class"] }>(),
  { align: "inline-start" },
)

function onClick(e: MouseEvent) {
  if ((e.target as HTMLElement).closest("button")) return
  ;(e.currentTarget as HTMLElement).parentElement?.querySelector<HTMLElement>("input, textarea")?.focus()
}
</script>

<template>
  <div
    role="group"
    data-slot="input-group-addon"
    :data-align="props.align"
    :class="cn(inputGroupAddonVariants({ align: props.align }), props.class)"
    @click="onClick"
  >
    <slot />
  </div>
</template>
