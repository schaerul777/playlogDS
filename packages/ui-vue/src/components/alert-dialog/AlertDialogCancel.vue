<script setup lang="ts">
import type { AlertDialogCancelProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Button, type ButtonVariants } from "@workspace/ui-vue/components/button"
import { AlertDialogCancel } from "reka-ui"

const props = withDefaults(
  defineProps<AlertDialogCancelProps & { class?: HTMLAttributes["class"]; variant?: ButtonVariants["variant"]; size?: ButtonVariants["size"] }>(),
  { variant: "outline", size: "default" },
)
</script>

<template>
  <AlertDialogCancel data-slot="alert-dialog-cancel" as-child>
    <Button :variant="props.variant" :size="props.size" :class="props.class">
      <slot />
    </Button>
  </AlertDialogCancel>
</template>
