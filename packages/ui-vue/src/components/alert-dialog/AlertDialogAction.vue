<script setup lang="ts">
import type { AlertDialogActionProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Button, type ButtonVariants } from "@workspace/ui-vue/components/button"
import { AlertDialogAction } from "reka-ui"

// Playlog: pass variant="destructive" when the action destroys data; otherwise the default (primary) button.
// Reka closes the dialog when the action is clicked (React leaves that to the caller).
const props = withDefaults(
  defineProps<AlertDialogActionProps & { class?: HTMLAttributes["class"]; variant?: ButtonVariants["variant"]; size?: ButtonVariants["size"] }>(),
  { variant: "default", size: "default" },
)
</script>

<template>
  <AlertDialogAction data-slot="alert-dialog-action" as-child>
    <Button :variant="props.variant" :size="props.size" :class="props.class">
      <slot />
    </Button>
  </AlertDialogAction>
</template>
