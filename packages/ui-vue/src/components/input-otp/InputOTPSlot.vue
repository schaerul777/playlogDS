<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { onMounted, ref } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { PinInputInput, useForwardExpose } from "reka-ui"
import { injectInputOTPContext } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  disabled?: boolean
}>()

const ctx = injectInputOTPContext()
// Position = order inside the field. The counter gives the first render's value; after mount the DOM order is the source of
// truth, so a slot that is re-mounted (hot reload, v-if) still gets the right index.
const initial = ctx.nextIndex()
const index = ref(initial)
const { forwardRef, currentElement } = useForwardExpose()
onMounted(() => {
  const el = currentElement.value as HTMLElement | undefined
  const root = el?.closest("[data-slot=input-otp]")
  if (!el || !root) return
  const slots = Array.from(root.querySelectorAll("[data-slot=input-otp-slot]"))
  const position = slots.indexOf(el)
  if (position >= 0) index.value = position
})

// Playlog: the first slot is named by the field's <label for> (so it gets no aria-label); the others say which character they are.
// Playlog: character validation. A single bad character is blocked before it reaches Reka. A multi-character insert (one-time-code
// autofill, an IME, a fast typist) is filtered and handed to Reka's paste handling, which fills the slots in order; Reka's own
// path for such inserts leaves a gap after a bad character in the middle of the text.
const patterns = {
  numeric: /^\d$/,
  alpha: /^[A-Za-z]$/,
  alphanumeric: /^[A-Za-z0-9]$/,
  none: /^[\s\S]$/,
} as const
function onBeforeInput(event: InputEvent) {
  const data = event.data
  if (!data) return
  const allowed = patterns[ctx.validationType]
  const filtered = [...data].filter((c) => allowed.test(c)).join("")
  if (filtered === data && [...data].length === 1) return
  event.preventDefault()
  if (!filtered) return
  const transfer = new DataTransfer()
  transfer.setData("text", filtered)
  event.target?.dispatchEvent(new ClipboardEvent("paste", { clipboardData: transfer, bubbles: true, cancelable: true }))
}

// Playlog: Backspace on a filled slot clears it and moves focus back one slot, like React. Reka clears and stays; the move runs
// after Reka's own handler so the value is already cleared. Backspace on an empty slot is left to Reka (it moves back and clears).
function onKeydown(event: KeyboardEvent) {
  if (event.key !== "Backspace") return
  const el = event.currentTarget as HTMLInputElement | null
  if (!el || !el.value) return
  const slots = Array.from(el.closest("[data-slot=input-otp]")?.querySelectorAll<HTMLInputElement>("[data-slot=input-otp-slot]") ?? [])
  const previous = slots[slots.indexOf(el) - 1]
  if (!previous) return
  setTimeout(() => previous.focus(), 0)
}
</script>

<template>
  <PinInputInput
    data-slot="input-otp-slot"
    :index="index"
    :ref="forwardRef"
    :id="index === 0 ? ctx.id : undefined"
    :disabled="disabled"
    :aria-label="index === 0 && ctx.id ? undefined : `Character ${index + 1}${ctx.length ? ` of ${ctx.length}` : ''}`"
    :aria-invalid="ctx.invalid ? true : undefined"
    :data-invalid="ctx.invalid ? '' : undefined"
    :aria-describedby="ctx.describedBy"
    :class="cn(
      // Playlog: each slot looks like an Input: 40x40, radius 4, card fill, 1px --input border, 14/20 foreground, centred.
      'size-10 min-w-0 rounded-md border-(length:--pl-border-width) border-input bg-card p-0 text-center text-body-sm text-foreground transition-colors duration-(--pl-duration-fast) ease-out',
      // Playlog: hover darkens the border to ink; the active slot takes the 2px ring, 2px offset.
      'hover:border-foreground outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring',
      // Playlog: disabled is 40%; invalid is pl-danger-text (the same token as Input), the ring stays --ring.
      'disabled:pointer-events-none disabled:opacity-(--pl-opacity-disabled) data-[disabled]:pointer-events-none data-[disabled]:opacity-(--pl-opacity-disabled) aria-invalid:border-danger-text data-[invalid]:border-danger-text',
      props.class,
    )"
    @beforeinput="onBeforeInput"
    @keydown="onKeydown"
  />
</template>
