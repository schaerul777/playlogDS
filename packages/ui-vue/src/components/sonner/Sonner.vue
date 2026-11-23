<script lang="ts" setup>
import type { ToasterProps } from "vue-sonner"
import { computed, onBeforeUnmount, onMounted, ref } from "vue"
import { buttonVariants } from "@workspace/ui-vue/components/button"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { Toaster as Sonner } from "vue-sonner"
import "vue-sonner/style.css"

// Playlog: COMPONENT-SPECS Toast. Bottom-right, 24 from the edges (16 on small screens), 8 between toasts,
// shown for 6 seconds. Toasts are unstyled by vue-sonner and drawn here with tokens only.
const props = defineProps<ToasterProps>()

// Playlog: the theme follows the `.dark` class on <html>, like the rest of the library (no color-mode package).
const documentTheme = ref<"light" | "dark">("light")
let observer: MutationObserver | undefined
function readTheme() {
  documentTheme.value = document.documentElement.classList.contains("dark") ? "dark" : "light"
}
onMounted(() => {
  readTheme()
  observer = new MutationObserver(readTheme)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
})
onBeforeUnmount(() => observer?.disconnect())

const toastOptions = computed(() => ({
  unstyled: true,
  ...props.toastOptions,
  // Playlog: transitions run at --pl-duration-slow instead of 400ms.
  style: { transitionDuration: "var(--pl-duration-slow)", ...props.toastOptions?.style },
  classes: {
    // Playlog: surface-raised with the overlay shadow, radius 4, padding 12 16, gap 12, no border.
    toast:
      "flex w-(--width) items-start gap-3 rounded-md bg-popover px-4 py-3 text-body-sm text-popover-foreground shadow-(--pl-shadow-overlay) *:duration-(--pl-duration-slow)! has-data-close-button:pr-12",
    icon: "relative flex size-5 shrink-0 items-center justify-center [&_svg:not([class*='size-'])]:size-(--pl-icon-size)",
    content: "flex min-w-0 flex-1 flex-col gap-0.5",
    title: "font-bold text-foreground",
    description: "text-muted-foreground",
    actionButton: cn(buttonVariants({ size: "sm" }), "self-center"),
    cancelButton: cn(buttonVariants({ variant: "outline", size: "sm" }), "self-center"),
    closeButton: cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "absolute top-2 right-2"),
    success: "[&_[data-icon]]:text-success-text",
    info: "[&_[data-icon]]:text-info-text",
    warning: "[&_[data-icon]]:text-warning-text",
    error: "[&_[data-icon]]:text-danger-text",
    loading: "[&_[data-icon]]:text-muted-foreground",
    ...props.toastOptions?.classes,
  },
}))
</script>

<template>
  <Sonner
    :class="cn('toaster group', props.class)"
    :theme="props.theme ?? documentTheme"
    :position="props.position ?? 'bottom-right'"
    :duration="props.duration ?? 6000"
    :gap="props.gap ?? 8"
    :offset="props.offset ?? 'var(--pl-space-5)'"
    :mobile-offset="props.mobileOffset ?? 'var(--pl-space-4)'"
    :close-button="props.closeButton"
    :visible-toasts="props.visibleToasts"
    :expand="props.expand"
    :rich-colors="props.richColors"
    :style="{
      // Playlog: toast width 360 (Tailwind step 90) and the spinner bars in muted-foreground.
      '--width': 'calc(var(--spacing) * 90)',
      '--gray11': 'var(--muted-foreground)',
      transitionDuration: 'var(--pl-duration-slow)',
      ...props.style,
    }"
    :toast-options="toastOptions"
  >
    <!-- Playlog: status is an icon in the matching *-text color plus the title words. No new glyphs:
         success uses check; loading keeps the built-in spinner. -->
    <template #success-icon><Icon name="check" /></template>
    <template #info-icon><Icon name="info" /></template>
    <template #warning-icon><Icon name="warning" /></template>
    <template #error-icon><Icon name="alert-circle" /></template>
    <template #close-icon><Icon name="close" /></template>
  </Sonner>
</template>
