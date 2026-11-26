<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { TraceStatus } from "."
import { Spinner } from "@workspace/ui-vue/components/spinner"
import { Icon } from "@workspace/ui-vue/icons"
import TraceIcon from "./TraceIcon.vue"

// Playlog addition: the status glyph for a line. Running: Spinner; error: alert-circle; pending: time; done: check
// (or the glyph of the step, for example `terminal`, passed as `icon`).
withDefaults(defineProps<{ status?: TraceStatus; icon?: string; class?: HTMLAttributes["class"] }>(), { icon: "check" })
</script>

<template>
  <TraceIcon :class="$props.class">
    <Spinner v-if="status === 'running'" class="size-4" />
    <Icon v-else :name="(status === 'error' ? 'alert-circle' : status === 'pending' ? 'time' : icon) as never" />
  </TraceIcon>
</template>
