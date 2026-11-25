<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Button } from "@workspace/ui-vue/components/button"
import { PopoverTrigger } from "@workspace/ui-vue/components/popover"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

defineOptions({ inheritAttrs: false })

// Playlog: the trigger looks like Input (40 high, sm 32, card fill, 1px --input border, radius 4, 14/20), calendar icon at the end.
const props = withDefaults(
  defineProps<{
    /** The formatted value, or undefined for the placeholder. */
    label?: string
    placeholder: string
    size?: "default" | "sm"
    invalid?: boolean
    clearable?: boolean
    disabled?: boolean
    class?: HTMLAttributes["class"]
  }>(),
  { size: "default", label: undefined, invalid: undefined, clearable: undefined, disabled: undefined },
)
const emit = defineEmits<{ clear: [] }>()
</script>

<template>
  <div class="relative w-full">
    <PopoverTrigger as-child>
      <button
        type="button"
        data-slot="date-picker-trigger"
        :disabled="disabled"
        :aria-invalid="invalid || undefined"
        v-bind="$attrs"
        :class="
          cn(
            // Playlog: as Input: 40 (sm 32), card fill, 1px --input border, radius 4, padding 0 12, gap 8, 14/20 foreground.
            'flex w-full min-w-0 items-center gap-2 rounded-md border-(length:--pl-border-width) border-input bg-card px-3 text-left text-body-sm text-foreground transition-colors duration-(--pl-duration-fast) ease-out',
            size === 'sm' ? 'h-8' : 'h-10',
            // Playlog: hover and open darken the border to ink; focus ring 2px, 2px offset.
            'outline-none hover:border-foreground data-[state=open]:border-foreground focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring',
            // Playlog: disabled 40%; invalid pl-danger-text (the ring stays --ring).
            'disabled:pointer-events-none disabled:opacity-(--pl-opacity-disabled) aria-invalid:border-danger-text',
            clearable && label && 'pr-16',
            props.class,
          )
        "
      >
        <span :class="cn('min-w-0 flex-1 truncate', !label && 'text-muted-foreground')">{{ label ?? placeholder }}</span>
        <Icon name="calendar" class="pointer-events-none size-4 shrink-0 text-muted-foreground" />
      </button>
    </PopoverTrigger>
    <Button
      v-if="clearable && label"
      type="button"
      variant="ghost"
      size="icon-xs"
      aria-label="Clear"
      class="absolute top-1/2 right-9 -translate-y-1/2"
      @click="emit('clear')"
    >
      <Icon name="close" />
    </Button>
  </div>
</template>
