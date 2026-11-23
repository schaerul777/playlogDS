<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{ class?: HTMLAttributes["class"]; size?: "sm" | "default" }>(),
  { size: "default" },
)

// Playlog: native defineModel instead of @vueuse/core useVModel (no extra dependency).
const modelValue = defineModel<string | number | string[]>()
</script>

<template>
  <div
    :class="cn('group/native-select relative w-fit has-[select:disabled]:opacity-(--pl-opacity-disabled)', props.class)"
    data-slot="native-select-wrapper"
    :data-size="size"
  >
    <select
      v-bind="$attrs"
      v-model="modelValue"
      data-slot="native-select"
      :data-size="size"
      :class="
        cn(
          // Playlog: COMPONENT-SPECS Native Select, as the Select trigger. 40 (sm 32), padding 0 36 0 12, radius 4.
          'h-10 w-full min-w-0 appearance-none rounded-md border-(length:--pl-border-width) border-input bg-card pr-9 pl-3 text-body-sm text-foreground transition-colors duration-(--pl-duration-fast) ease-out select-none hover:border-foreground data-[size=sm]:h-8',
          'outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring',
          'disabled:pointer-events-none aria-invalid:border-danger-text',
        )
      "
    >
      <slot />
    </select>
    <!-- Playlog: chevron-down 16 in muted-foreground, 10 from the right edge. -->
    <Icon
      name="chevron-down"
      aria-hidden="true"
      class="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground select-none"
    />
  </div>
</template>
