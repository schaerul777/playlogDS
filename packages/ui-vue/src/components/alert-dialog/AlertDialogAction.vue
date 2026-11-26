<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Button, type ButtonVariants } from "@workspace/ui-vue/components/button"

// Playlog: pass variant="destructive" when the action destroys data; otherwise the default (primary) button.
// As in React, this is a plain Button: it does NOT close the dialog (Reka's AlertDialogAction would).
// Close it yourself with v-model:open, or wrap the button in AlertDialogCancel-style closing as needed.
const props = withDefaults(
  defineProps<{ class?: HTMLAttributes["class"]; variant?: ButtonVariants["variant"]; size?: ButtonVariants["size"] }>(),
  { variant: "default", size: "default" },
)
</script>

<template>
  <Button data-slot="alert-dialog-action" :variant="props.variant" :size="props.size" :class="props.class">
    <slot />
  </Button>
</template>
