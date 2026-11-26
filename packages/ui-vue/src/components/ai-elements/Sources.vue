<script setup lang="ts">
import { Trace, TraceCollapsible, TraceCollapsibleContent, TraceCollapsibleTrigger, TraceIcon, TraceLine, TraceTitle } from "@workspace/ui-vue/components/trace"
import { Icon } from "@workspace/ui-vue/icons"

export type Source = { url: string; title?: string }

defineProps<{ sources: Source[] }>()

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}
</script>

<template>
  <!-- Playlog: COMPONENT-SPECS Sources. A Trace line "Used 3 sources" (icon `globe`) that opens into one link per source:
       the title or hostname and a trailing `arrow-up-right`, with "(opens in a new tab)" for screen readers. -->
  <Trace v-if="sources.length > 0">
    <TraceCollapsible>
      <TraceCollapsibleTrigger>
        <TraceLine>
          <TraceIcon><Icon name="globe" /></TraceIcon>
          <TraceTitle>Used {{ sources.length }} {{ sources.length === 1 ? "source" : "sources" }}</TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <a v-for="source in sources" :key="source.url" :href="source.url" target="_blank" rel="noreferrer" class="group/source">
            <TraceLine class="group-hover/source:text-foreground group-hover/source:underline group-hover/source:underline-offset-4">
              <TraceTitle>{{ source.title ?? hostname(source.url) }}<span class="sr-only"> (opens in a new tab)</span></TraceTitle>
              <TraceIcon><Icon name="arrow-up-right" /></TraceIcon>
            </TraceLine>
          </a>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
