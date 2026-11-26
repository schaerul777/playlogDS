<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { Button } from "@workspace/ui-vue/components/button"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { injectMessageScroller } from "./context"

type ButtonProps = InstanceType<typeof Button>["$props"]
const props = withDefaults(
  defineProps<{
    direction?: "start" | "end"
    behavior?: ScrollBehavior
    variant?: ButtonProps["variant"]
    size?: ButtonProps["size"]
    class?: HTMLAttributes["class"]
  }>(),
  { direction: "end", behavior: "smooth", variant: "outline", size: "icon-sm" },
)
const emit = defineEmits<{ click: [event: MouseEvent] }>()
const ctx = injectMessageScroller()
const state = ctx.stateStore.value
const active = computed(() => (props.direction === "start" ? state.value.start : state.value.end))

function onClick(event: MouseEvent) {
  if (!active.value) return
  emit("click", event)
  if (event.defaultPrevented) return
  ;(event.currentTarget as HTMLElement).blur()
  if (props.direction === "start") ctx.scrollToStart({ behavior: props.behavior })
  else ctx.scrollToEnd({ behavior: props.behavior })
}
</script>

<template>
  <!-- Playlog: Button outline icon-sm (card fill), overlay shadow, centred 16 above the input; fades and slides 8 at
       --pl-duration-fast; inert when there is nothing to scroll to. -->
  <Button
    data-slot="message-scroller-button"
    :data-direction="direction"
    :data-variant="variant"
    :data-size="size"
    :data-active="active ? 'true' : 'false'"
    :variant="variant"
    :size="size"
    type="button"
    :inert="!active || undefined"
    :tabindex="active ? undefined : -1"
    :class="
      cn(
        'absolute inset-s-1/2 -translate-x-1/2 shadow-(--pl-shadow-overlay) transition-[translate,opacity] duration-(--pl-duration-fast) ease-out data-[active=false]:pointer-events-none data-[active=false]:opacity-0 data-[active=true]:translate-y-0 data-[active=true]:opacity-100 data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-2 data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-2 rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180',
        props.class,
      )
    "
    @click="onClick"
  >
    <slot>
      <Icon name="chevron-down" />
      <span class="sr-only">{{ direction === "end" ? "Scroll to end" : "Scroll to start" }}</span>
    </slot>
  </Button>
</template>
