<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { Button } from "@workspace/ui-vue/components/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@workspace/ui-vue/components/hover-card"
import { Progress, ProgressLabel, ProgressValue } from "@workspace/ui-vue/components/progress"
import { Icon } from "@workspace/ui-vue/icons"
import { cn } from "@workspace/ui-vue/lib/utils" // Playlog: brand-aware merger
import { formatTokens, getContextLevel } from "./context-utils"

// Playlog: COMPONENT-SPECS Context. A Hover Card opened from a Button `outline` `sm` ("7% context"), showing how much of the
// model's context window is used with our Progress bar. Levels: low under 75% (fill Green), medium 75–89% (fill
// `pl-warning`, `warning` icon, "Getting full" in `pl-warning-text`), near-full 90% and above (fill `pl-danger`,
// `alert-circle` icon, a sentence in `pl-danger-text`): colour is never the only cue. `limit` is the model's window and is
// always passed in, never read from a provider.
const props = defineProps<{
  /** Tokens used so far. */
  used: number
  /** The model's context window, in tokens. */
  limit: number
  /** Optional breakdown rows, for example Input, Output, Reasoning. */
  usage?: { label: string; value: number }[]
  class?: HTMLAttributes["class"]
}>()
const percent = computed(() => Math.min(100, Math.round((props.used / props.limit) * 100)))
const level = computed(() => getContextLevel(percent.value))
const summary = computed(() => `${formatTokens(props.used)} / ${formatTokens(props.limit)}`)
</script>

<template>
  <HoverCard>
    <HoverCardTrigger as-child>
      <Button variant="outline" size="sm" :class="props.class" :aria-label="`Context window ${percent}% used, ${formatTokens(used)} of ${formatTokens(limit)} tokens`">
        <Icon v-if="level === 'medium'" name="warning" />
        <Icon v-if="level === 'near-full'" name="alert-circle" />
        {{ percent }}% context
      </Button>
    </HoverCardTrigger>
    <HoverCardContent align="start" class="flex flex-col gap-3">
      <!-- Progress renders its own track and fill; the fill colour follows the level through its slot. -->
      <Progress
        :model-value="percent"
        aria-label="Context used"
        :class="cn(level === 'medium' && '[&_[data-slot=progress-indicator]]:bg-warning', level === 'near-full' && '[&_[data-slot=progress-indicator]]:bg-danger')"
      >
        <ProgressLabel>Context</ProgressLabel>
        <ProgressValue>{{ summary }}</ProgressValue>
      </Progress>
      <p v-if="level !== 'low'" :class="cn('text-caption', level === 'medium' ? 'text-warning-text' : 'text-danger-text')">
        {{ level === "medium" ? "Getting full" : "Nearly full: the oldest messages may be dropped" }}
      </p>
      <dl v-if="usage?.length" class="flex flex-col gap-1 text-caption">
        <div v-for="row in usage" :key="row.label" class="flex items-baseline justify-between gap-3">
          <dt class="text-muted-foreground">{{ row.label }}</dt>
          <dd class="text-foreground tabular-nums">{{ formatTokens(row.value) }}</dd>
        </div>
      </dl>
    </HoverCardContent>
  </HoverCard>
</template>
