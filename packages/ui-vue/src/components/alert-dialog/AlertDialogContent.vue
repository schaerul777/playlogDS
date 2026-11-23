<script setup lang="ts">
import type { AlertDialogContentEmits, AlertDialogContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { AlertDialogContent, AlertDialogOverlay, AlertDialogPortal, useForwardPropsEmits } from "reka-ui"

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<AlertDialogContentProps & { class?: HTMLAttributes["class"]; size?: "default" | "sm" }>(),
  { size: "default" },
)
const emits = defineEmits<AlertDialogContentEmits>()

const delegatedProps = computed(() => {
  const { class: _class, size: _size, ...delegated } = props
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <AlertDialogPortal>
    <AlertDialogOverlay
      data-slot="alert-dialog-overlay"
      class="fixed inset-0 isolate z-50 bg-scrim duration-(--pl-duration-fast) ease-out data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
    />
    <AlertDialogContent
      data-slot="alert-dialog-content"
      :data-size="size"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          // Playlog: COMPONENT-SPECS Alert Dialog. Dialog panel; max 448 (sm 320); no close button; fade only.
          'group/alert-dialog-content fixed inset-x-4 top-1/2 z-50 mx-auto grid -translate-y-1/2 gap-4 rounded-lg bg-popover p-6 text-body-sm text-popover-foreground shadow-(--pl-shadow-overlay) outline-none duration-(--pl-duration-fast) ease-out data-[size=default]:max-w-md data-[size=sm]:max-w-xs data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          props.class,
        )
      "
    >
      <slot />
    </AlertDialogContent>
  </AlertDialogPortal>
</template>
