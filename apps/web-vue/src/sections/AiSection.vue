<script setup lang="ts">
import { ref } from "vue"
import { Confirmation, InlineCitation, PromptInput, Reasoning, Sources, Suggestion, Suggestions } from "@workspace/ui-vue/components/ai-elements"
import { Trace } from "@workspace/ui-vue/components/trace"

const picked = ref("")
const sent = ref("")
const answer = ref("")
const SOURCES = [
  { url: "https://docs.playlog.example/reach-methodology", title: "Reach methodology" },
  { url: "https://www.playlog.example/city-report", title: "City report, Q3 2025" },
  { url: "https://docs.playlog.example/screen-audit" },
]
const CITATION = { url: "https://docs.playlog.example/reach-methodology", title: "Reach methodology", description: "How reach is counted per screen and per period." }
const file = new File(["x"], "city-report.csv")
</script>

<template>
  <p class="text-caption font-medium tracking-wide text-muted-foreground uppercase">AI elements</p>

  <section class="flex max-w-xl flex-col gap-4">
    <h2 class="text-h3 font-bold text-ink-heading">Suggestion</h2>
    <Suggestions data-specimen="suggestions">
      <Suggestion v-for="s in ['Which cities lead on reach?', 'Summarise Q3', 'Compare Jakarta and Bandung']" :key="s" :suggestion="s" @suggestion-click="picked = $event" />
    </Suggestions>
    <p class="text-caption text-muted-foreground" data-testid="picked">{{ picked ? `Sent: ${picked}` : "Nothing sent yet" }}</p>
  </section>

  <section class="flex max-w-xl flex-col gap-4">
    <h2 class="text-h3 font-bold text-ink-heading">Prompt Input</h2>
    <div class="flex flex-col gap-4" data-specimen="prompt">
      <PromptInput @submit="sent = $event.text" />
      <PromptInput default-text="Which cities lead on reach in Q3?" :default-files="[file]" />
      <PromptInput status="streaming" default-text="A message being answered" />
      <PromptInput status="disabled" />
    </div>
    <p class="text-caption text-muted-foreground" data-testid="sent">{{ sent ? `Submitted: ${sent}` : "Nothing submitted yet" }}</p>
  </section>

  <section class="flex max-w-xl flex-col gap-4">
    <h2 class="text-h3 font-bold text-ink-heading">Reasoning, Sources, Inline Citation, Confirmation</h2>
    <div class="flex flex-col gap-4" data-specimen="agent">
      <Trace>
        <Reasoning running>Checking the city report first, then the screen audit.</Reasoning>
        <Reasoning :duration="5">Checked the city report, then the screen audit.</Reasoning>
        <Reasoning :duration="3" />
        <Sources :sources="SOURCES" />
      </Trace>
      <p class="text-body-sm">
        Jakarta leads on reach in Q3<InlineCitation :source="CITATION" />, ahead of Surabaya and Bandung.
      </p>
      <Confirmation title="Run pnpm build?" description="Builds every package in the repo." @approve="answer = 'Approved'" @deny="answer = 'Denied'" />
      <Confirmation title="Delete the cache?" description="Frees 1.2 GB." disabled />
      <p class="text-caption text-muted-foreground" data-testid="answer">{{ answer || "No answer yet" }}</p>
    </div>
  </section>
</template>
