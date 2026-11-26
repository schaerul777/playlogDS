<script setup lang="ts">
import type { ButtonVariants } from "@workspace/ui-vue/components/button"
import { onBeforeUnmount, ref } from "vue"
import { Button } from "@workspace/ui-vue/components/button"
import { Icon } from "@workspace/ui-vue/icons"

// Two roots (the button and its live region), so attributes go to the Button explicitly.
defineOptions({ inheritAttrs: false })
const props = withDefaults(defineProps<{ value: string; variant?: ButtonVariants["variant"]; size?: ButtonVariants["size"] }>(), {
  variant: "ghost",
  size: "icon-xs",
})

const copied = ref(false)
let timer: number | undefined
function copy() {
  navigator.clipboard
    .writeText(props.value)
    .then(() => {
      copied.value = true
      window.clearTimeout(timer)
      timer = window.setTimeout(() => (copied.value = false), 2000)
    })
    .catch(() => {})
}
onBeforeUnmount(() => window.clearTimeout(timer))
</script>

<template>
  <Button
    data-slot="code-block-copy-button"
    :data-copied="copied || undefined"
    :variant="variant"
    :size="size"
    :aria-label="copied ? 'Copied' : 'Copy'"
    v-bind="$attrs"
    @click="copy"
  >
    <!-- Playlog: clipboard, then check for 2s. -->
    <Icon :name="copied ? 'check' : 'clipboard'" />
  </Button>
  <span aria-live="polite" class="sr-only">{{ copied ? "Copied" : "" }}</span>
</template>
