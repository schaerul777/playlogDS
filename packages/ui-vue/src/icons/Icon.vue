<script setup lang="ts">
// Playlog: the only icon source (port of packages/ui/src/icons/icon.tsx). The 48 set glyphs are filled
// outlines (fill-rule evenodd); check, chevron-down, chevron-right, close and search (and the extra
// glyphs) are 2px round strokes on the same 24px grid. Path data is shared via @workspace/tokens.
import { computed, useId } from "vue"

import {
  extraStrokeIconPaths,
  type ExtraIconName,
} from "@workspace/tokens/icons/extra-icons"
import {
  iconPaths,
  strokeIconPaths,
  type IconName as SetIconName,
} from "@workspace/tokens/icons/icon-data"

/** Every glyph Icon can draw: the Playlog set (48 filled + 5 stroke) and the approved extra stroke glyphs. */
type IconName = SetIconName | ExtraIconName

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    /** Glyph from the Playlog icon set. */
    name: IconName
    /** Rendered width and height in px. Defaults to 20 (the UI icon size). Component CSS can override it. */
    size?: number
    /** Accessible name. Without it the icon is decorative (aria-hidden). */
    title?: string
  }>(),
  { size: 20, title: undefined }
)

const strokePaths: Record<string, string> = {
  ...strokeIconPaths,
  ...extraStrokeIconPaths,
}

const titleId = useId()
const stroke = computed(() =>
  Object.prototype.hasOwnProperty.call(strokePaths, props.name)
)
const filledPaths = computed<readonly string[]>(() =>
  stroke.value
    ? []
    : (iconPaths as Record<string, readonly string[]>)[props.name]
)
</script>

<template>
  <svg
    data-slot="icon"
    :data-icon-name="name"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :width="size"
    :height="size"
    v-bind="$attrs"
    :role="title ? 'img' : undefined"
    :aria-labelledby="title ? titleId : undefined"
    :aria-hidden="title ? undefined : true"
    :focusable="title ? undefined : 'false'"
  >
    <title v-if="title" :id="titleId">{{ title }}</title>
    <path
      v-if="stroke"
      :d="strokePaths[name]"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <template v-else>
      <path
        v-for="(d, i) in filledPaths"
        :key="i"
        :d="d"
        fill="currentColor"
        fill-rule="evenodd"
      />
    </template>
  </svg>
</template>
