<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { Button } from "@workspace/ui-vue/components/button"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import {
  DialogClose,
  DialogContent,
  DialogPortal,
  useForwardPropsEmits,
} from "reka-ui"
import DialogOverlay from "./DialogOverlay.vue"

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<
    DialogContentProps & {
      class?: HTMLAttributes["class"]
      showCloseButton?: boolean
    }
  >(),
  { showCloseButton: true }
)
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = computed(() => {
  const { class: _class, showCloseButton: _show, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent
      data-slot="dialog-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          // Playlog: COMPONENT-SPECS Dialog. Centred, 16 gutter, max 512, radius 8, padding 24, gap 16,
          // surface-raised with the overlay shadow, no border. Fade only (no zoom), at --pl-duration-fast.
          'fixed inset-x-4 top-1/2 z-50 mx-auto grid max-w-lg -translate-y-1/2 gap-4 rounded-lg bg-popover p-6 text-body-sm text-popover-foreground shadow-(--pl-shadow-overlay) outline-none duration-(--pl-duration-fast) ease-out data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          props.class,
        )
      "
    >
      <slot />

      <!-- Playlog: Button ghost icon-sm (32) with the close icon, 16 from the top and right. -->
      <DialogClose v-if="showCloseButton" as-child>
        <Button
          data-slot="dialog-close"
          variant="ghost"
          size="icon-sm"
          class="absolute top-4 right-4"
        >
          <Icon name="close" />
          <span class="sr-only">Close</span>
        </Button>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
