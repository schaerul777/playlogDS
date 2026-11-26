<script setup lang="ts">
import { ref } from "vue"
import { AssistantMessage, AssistantMessageActions, Chat, ChatEmpty, ChatFooter, ChatHeader, ChatThread, ChatTurn, Confirmation, InlineCitation, PromptInput, Reasoning, Sources, Suggestion, Suggestions, Tool, UserMessage, UserMessageActions } from "@workspace/ui-vue/components/ai-elements"
import { Button } from "@workspace/ui-vue/components/button"
import { CodeBlock, CodeBlockContent, CodeBlockFooter } from "@workspace/ui-vue/components/code-block"
import { Marker, MarkerContent, MarkerIcon } from "@workspace/ui-vue/components/marker"
import { Spinner } from "@workspace/ui-vue/components/spinner"
import { Trace } from "@workspace/ui-vue/components/trace"
import { Icon } from "@workspace/ui-vue/icons"
import HighlightedCode from "./HighlightedCode.vue"

const QUERY = `SELECT city, SUM(impressions) AS impressions, MAX(reach) AS reach
FROM city_report
WHERE period = 'Q3 2025'
GROUP BY city
ORDER BY reach DESC
LIMIT 3;`
const DIFF = `const periods = ["Q1 2025", "Q2 2025"]
const periods = ["Q1 2025", "Q2 2025", "Q3 2025"]
const label = (p: string) => p.toUpperCase()`
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

// Live thread: a canned reply streamed from memory. Nothing calls a model or a network.
const CANNED = "Reach counts each person once per screen and period, so adding two periods together can count the same person twice. Compare periods side by side instead."
type Turn = { id: string; text: string; reply: string; done: boolean }
const turns = ref<Turn[]>([])
const streaming = ref(false)
let timer: ReturnType<typeof setInterval> | null = null
let idn = 0
function stop() {
  if (timer) clearInterval(timer)
  timer = null
  streaming.value = false
  turns.value = turns.value.map((t) => ({ ...t, done: true }))
}
function send(text: string) {
  const id = `live-${++idn}`
  const words = CANNED.split(" ")
  let count = 0
  turns.value.push({ id, text, reply: "", done: false })
  streaming.value = true
  timer = setInterval(() => {
    count += 1
    const t = turns.value.find((x) => x.id === id)!
    t.reply = words.slice(0, count).join(" ")
    t.done = count >= words.length
    if (count >= words.length) {
      if (timer) clearInterval(timer)
      timer = null
      streaming.value = false
    }
  }, 45)
}
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

  <section class="flex flex-col gap-4">
    <h2 class="text-h3 font-bold text-ink-heading">Tool and Code Block</h2>
    <div class="grid gap-6 md:grid-cols-2">
      <div class="flex flex-col gap-3" data-specimen="tool">
        <p class="text-caption text-muted-foreground">Tool: running, done, failed (open), denied, pending.</p>
        <Trace>
          <Tool state="running" command="pnpm test" />
          <Tool state="done" command="git status --short" :output="' M apps/web/src/App.tsx\n M packages/ui/package.json'" />
          <Tool state="error" command="pnpm build" output="Command timed out after 120 seconds." />
          <Tool state="denied" command="rm -rf dist" />
          <Tool state="pending" command="pnpm lint" />
        </Trace>
      </div>
      <div class="grid gap-4 md:col-span-2 md:grid-cols-2" data-specimen="code">
        <HighlightedCode :code="QUERY" language="sql" title="reach-by-city.sql" line-numbers />
        <HighlightedCode :code="DIFF" language="typescript" title="periods.ts" line-numbers :variants="{ 1: 'removed', 2: 'added', 3: 'highlighted' }" />
        <HighlightedCode :code="'pnpm build\npnpm: command not found'" language="bash" size="sm" variant="destructive" title="Failed" />
        <CodeBlock size="sm">
          <CodeBlockContent wrap>Plain output with no language, wrapped. A long line wraps instead of scrolling: the quick brown fox jumps over the lazy dog.</CodeBlockContent>
          <CodeBlockFooter><span class="text-caption">Footer text</span></CodeBlockFooter>
        </CodeBlock>
      </div>
    </div>
  </section>

  <section class="flex flex-col gap-4">
    <h2 class="text-h3 font-bold text-ink-heading">Chat</h2>
    <p class="text-caption text-muted-foreground">Static thread: turns, reasoning, citations, sources, a pending approval and a status marker.</p>
    <div class="h-160 overflow-hidden rounded-lg border-(length:--pl-border-width) border-border bg-background" data-specimen="chat-static">
      <Chat>
        <ChatHeader title="Q3 reach review" description="Static mock conversation, no model." />
        <ChatThread>
          <ChatTurn id="u1" anchor>
            <UserMessage>
              Which three cities had the highest reach in Q3 2025?
              <template #actions><UserMessageActions text="Which three cities had the highest reach in Q3 2025?" :on-edit="() => {}" /></template>
            </UserMessage>
          </ChatTurn>
          <ChatTurn id="a1">
            <AssistantMessage>
              <Trace>
                <Reasoning :duration="4">The city report is keyed by period, so I can group Q3 2025 by city and sort by reach.</Reasoning>
              </Trace>
              <p>Jakarta Selatan, Surabaya and Bandung led reach in Q3 2025 (July to September, 25 cities). <InlineCitation :source="CITATION" /></p>
              <ul class="flex list-disc flex-col gap-1 pl-5">
                <li>Jakarta Selatan: 1,28 M reach from 4,2 M impressions.</li>
                <li>Surabaya: 902 K reach from 3,1 M impressions.</li>
              </ul>
              <HighlightedCode :code="QUERY" language="sql" title="reach-by-city.sql" size="sm" />
              <Sources :sources="SOURCES" />
              <template #actions><AssistantMessageActions text="Jakarta Selatan, Surabaya and Bandung led reach in Q3 2025." :on-retry="() => {}" /></template>
            </AssistantMessage>
          </ChatTurn>
          <ChatTurn id="u2" anchor>
            <UserMessage>Check the screen audit against this and clean up the old export.</UserMessage>
          </ChatTurn>
          <ChatTurn id="a2">
            <AssistantMessage>
              <Trace><Reasoning running>Comparing the audit with the city report. Deleting the old export cannot be undone, so I should ask first.</Reasoning></Trace>
              <Confirmation title="Run rm -rf exports/q3-old?" description="The command deletes the old export in this project." />
              <Marker role="status"><MarkerIcon><Spinner class="size-4" /></MarkerIcon><MarkerContent>Waiting for your answer…</MarkerContent></Marker>
            </AssistantMessage>
          </ChatTurn>
        </ChatThread>
        <ChatFooter>
          <Suggestions>
            <Suggestion suggestion="Compare with Q2 2025" />
            <Suggestion suggestion="Export as CSV" />
          </Suggestions>
          <PromptInput status="disabled" placeholder="Answer the question above to continue" />
        </ChatFooter>
      </Chat>
    </div>
    <p class="text-caption text-muted-foreground">Live thread (canned reply): type and press Enter, Escape stops the reply.</p>
    <div class="h-128 overflow-hidden rounded-lg border-(length:--pl-border-width) border-border bg-background" data-specimen="chat-live">
      <Chat>
        <ChatHeader title="New thread" description="Ask about reach, impressions and screens.">
          <template #action>
            <Button variant="outline" size="icon" aria-label="Reset conversation" :disabled="streaming" @click="turns = []"><Icon name="refresh" /></Button>
          </template>
        </ChatHeader>
        <div v-if="turns.length === 0" class="min-h-0 flex-1">
          <ChatEmpty>
            <Suggestions class="justify-center">
              <Suggestion suggestion="Top cities by reach in Q3 2025" @suggestion-click="send" />
              <Suggestion suggestion="Impressions by product line" @suggestion-click="send" />
              <Suggestion suggestion="Which screens were offline?" @suggestion-click="send" />
            </Suggestions>
          </ChatEmpty>
        </div>
        <ChatThread v-else :busy="streaming">
          <template v-for="turn in turns" :key="turn.id">
            <ChatTurn :id="`${turn.id}-u`" anchor><UserMessage>{{ turn.text }}</UserMessage></ChatTurn>
            <ChatTurn :id="`${turn.id}-a`">
              <AssistantMessage>
                <Marker v-if="turn.reply === ''" role="status"><MarkerIcon><Spinner class="size-4" /></MarkerIcon><MarkerContent>Thinking…</MarkerContent></Marker>
                <p v-else>{{ turn.reply }}</p>
                <template v-if="turn.done" #actions><AssistantMessageActions :text="turn.reply" :on-retry="() => send(turn.text)" /></template>
              </AssistantMessage>
            </ChatTurn>
          </template>
        </ChatThread>
        <ChatFooter>
          <PromptInput :status="streaming ? 'streaming' : 'ready'" placeholder="Ask about reach, impressions or screens" @submit="send($event.text)" @stop="stop" />
        </ChatFooter>
      </Chat>
    </div>
  </section>
</template>
