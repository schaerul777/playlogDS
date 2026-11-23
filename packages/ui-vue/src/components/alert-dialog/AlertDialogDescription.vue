<script setup lang="ts">
import type { AlertDialogDescriptionProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { AlertDialogDescription } from "reka-ui"

const props = defineProps<AlertDialogDescriptionProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Playlog: 14/20 muted-foreground; links use the link token. -->
  <AlertDialogDescription data-slot="alert-dialog-description" :as="props.as" :as-child="props.asChild" :class="cn('text-body-sm text-muted-foreground *:[a]:text-link *:[a]:underline', props.class)">
    <slot />
  </AlertDialogDescription>
</template>
