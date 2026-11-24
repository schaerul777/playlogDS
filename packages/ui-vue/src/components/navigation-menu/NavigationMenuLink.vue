<script setup lang="ts">
import type { NavigationMenuLinkEmits, NavigationMenuLinkProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { NavigationMenuLink, useForwardPropsEmits } from "reka-ui"

const props = defineProps<NavigationMenuLinkProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<NavigationMenuLinkEmits>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <!-- Playlog: panel link. Padding 8 12, radius 2, body-sm foreground; hover accent; current page ink-heading.
       For a top-level link, pass :class="navigationMenuTriggerStyle()" instead. -->
  <NavigationMenuLink
    data-slot="navigation-menu-link"
    v-bind="forwarded"
    :class="
      cn(
        'flex flex-col items-start gap-0.5 rounded-sm px-3 py-2 text-body-sm text-foreground transition-colors duration-(--pl-duration-fast) ease-out hover:bg-accent hover:text-accent-foreground data-[active]:text-ink-heading outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring [&_svg:not([class*=\'size-\'])]:size-4',
        props.class,
      )
    "
  >
    <slot />
  </NavigationMenuLink>
</template>
