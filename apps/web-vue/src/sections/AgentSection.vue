<script setup lang="ts">
import { ref } from "vue"
import { Bubble, BubbleContent } from "@workspace/ui-vue/components/bubble"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@workspace/ui-vue/components/input-group"
import { Message, MessageContent } from "@workspace/ui-vue/components/message"
import { Trace } from "@workspace/ui-vue/components/trace"
import { ChainOfThought, ChainOfThoughtBadges, ChainOfThoughtStep, Checkpoint, Context, ModelSelector, Plan, Queue, Subagent, Task, TaskStep, Tool, type ModelProvider, type PlanStep, type QueueTodo } from "@workspace/ui-vue/components/ai-elements"
import { Icon } from "@workspace/ui-vue/icons"

// Static mock data. Nothing here calls a model, a provider or a network.
const PLAN_STEPS: PlanStep[] = [
  { title: "Install @base-ui/react", state: "done" },
  { title: "Replace the Radix imports", state: "done" },
  { title: "Rename asChild to render", state: "running" },
  { title: "Update the snapshots", state: "pending" },
  { title: "Migrate the toast", state: "skipped" },
  { title: "Run the type checker", state: "error" },
]
const TODOS: QueueTodo[] = [
  { id: "1", title: "Add a changeset", status: "completed" },
  { id: "2", title: "Write the migration guide", description: "Cover the renamed props and the new data attributes.", status: "completed" },
  { id: "3", title: "Fix the focus ring on the select trigger", description: "It is clipped by overflow-hidden on the field.", status: "in-progress" },
  { id: "4", title: "Update the registry snapshots", status: "pending" },
  { id: "5", title: "Add tests for the combobox", status: "pending" },
]
const PROVIDERS: ModelProvider[] = [
  { name: "Provider A", models: [{ value: "alpha-large", label: "Alpha Large", badge: "New" }, { value: "alpha-small", label: "Alpha Small" }] },
  { name: "Provider B", models: [{ value: "beta-2", label: "Beta 2" }, { value: "beta-1", label: "Beta 1", disabled: true }] },
]
const USAGE = [{ label: "Input", value: 8420 }, { label: "Output", value: 260 }, { label: "Reasoning", value: 980 }]
const model = ref("alpha-large")
const effort = ref("medium")
const restored = ref(false)
</script>

<template>
  <p class="text-caption font-medium tracking-wide text-muted-foreground uppercase">Agent</p>

  <section class="flex flex-col gap-4">
    <h2 class="text-h3 font-bold text-ink-heading">Chain of Thought</h2>
    <div class="flex flex-wrap items-start gap-6" data-specimen="cot">
      <div class="flex w-full max-w-sm flex-col gap-2"><p class="text-caption text-muted-foreground">Running (open)</p>
        <div class="rounded-lg border-(length:--pl-border-width) border-border bg-card p-4 text-body-sm">
          <Trace><ChainOfThought running>
            <ChainOfThoughtStep title="Read the build log for dpl_8Kx2" icon="terminal" />
            <ChainOfThoughtStep title="Searching the web for image cache key" status="running" />
          </ChainOfThought></Trace>
        </div></div>
      <div class="flex w-full max-w-sm flex-col gap-2"><p class="text-caption text-muted-foreground">Done (closed)</p>
        <div class="rounded-lg border-(length:--pl-border-width) border-border bg-card p-4 text-body-sm">
          <Trace><ChainOfThought>
            <ChainOfThoughtStep title="Read the build log for dpl_8Kx2" icon="terminal" />
            <ChainOfThoughtStep title="Searched the web for image cache key"><ChainOfThoughtBadges :items="['nextjs.org', 'vercel.com']" /></ChainOfThoughtStep>
          </ChainOfThought></Trace>
        </div></div>
      <div class="flex w-full max-w-sm flex-col gap-2"><p class="text-caption text-muted-foreground">Done (open), one failed</p>
        <div class="rounded-lg border-(length:--pl-border-width) border-border bg-card p-4 text-body-sm">
          <Trace><ChainOfThought default-open :failed="1">
            <ChainOfThoughtStep title="Searched the code for cacheKey"><ChainOfThoughtBadges :items="['next.config.ts', 'scripts/optimize-images.ts']" /></ChainOfThoughtStep>
            <ChainOfThoughtStep title="Failed to read the deploy settings" status="error">Error: 403 Forbidden</ChainOfThoughtStep>
          </ChainOfThought></Trace>
        </div></div>
    </div>
  </section>

  <section class="flex flex-col gap-4">
    <h2 class="text-h3 font-bold text-ink-heading">Plan and Task</h2>
    <div class="flex flex-wrap items-start gap-6" data-specimen="plan">
      <div class="flex w-full max-w-sm flex-col gap-2"><p class="text-caption text-muted-foreground">Plan: every step state</p>
        <div class="rounded-lg border-(length:--pl-border-width) border-border bg-card p-4 text-body-sm"><Trace><Plan title="Plan: migrate to Base UI" :steps="PLAN_STEPS" /></Trace></div></div>
      <div class="flex w-full max-w-sm flex-col gap-2"><p class="text-caption text-muted-foreground">Plan with a description, closed</p>
        <div class="rounded-lg border-(length:--pl-border-width) border-border bg-card p-4 text-body-sm"><Trace>
          <Plan title="Plan: add dark mode" :default-open="false" description="Store the theme in a cookie so the server renders the right one." :steps="[{ title: 'Add a dark variant to the tokens', state: 'done' }, { title: 'Add a toggle to the settings page', state: 'pending' }]" />
        </Trace></div></div>
      <div class="flex w-full max-w-sm flex-col gap-2"><p class="text-caption text-muted-foreground">Task: running, failed and done</p>
        <div class="rounded-lg border-(length:--pl-border-width) border-border bg-card p-4 text-body-sm"><Trace>
          <Task title="Updating the page metadata" status="running">
            <TaskStep title="Searched for app/page.tsx" />
            <TaskStep title="Reading app/layout.tsx" icon="sticky-note" status="running" />
          </Task>
          <Task title="Failed to update the sitemap" status="error" default-open>
            <TaskStep title="Failed to read sitemap.ts" icon="sticky-note" status="error" />
          </Task>
          <Task title="Found the project files">
            <TaskStep title="Searched for app/page.tsx" />
            <TaskStep title="Read app/page.tsx" icon="sticky-note" href="#files" />
          </Task>
        </Trace></div></div>
    </div>
  </section>

  <section class="flex flex-col gap-4">
    <h2 class="text-h3 font-bold text-ink-heading">Queue</h2>
    <div class="flex flex-wrap items-start gap-6" data-specimen="queue">
      <div class="flex w-full max-w-sm flex-col gap-2"><p class="text-caption text-muted-foreground">Mixed</p>
        <div class="rounded-lg border-(length:--pl-border-width) border-border bg-card p-4 text-body-sm"><Trace><Queue :todos="TODOS" /></Trace></div></div>
      <div class="flex w-full max-w-sm flex-col gap-2"><p class="text-caption text-muted-foreground">Only completed</p>
        <div class="rounded-lg border-(length:--pl-border-width) border-border bg-card p-4 text-body-sm"><Trace><Queue :todos="TODOS.filter((t) => t.status === 'completed')" /></Trace></div></div>
      <div class="flex w-full max-w-sm flex-col gap-2"><p class="text-caption text-muted-foreground">Empty (renders nothing)</p>
        <div class="rounded-lg border-(length:--pl-border-width) border-border bg-card p-4 text-body-sm"><Queue :todos="[]" /><p class="text-caption text-muted-foreground">No output.</p></div></div>
    </div>
  </section>

  <section class="flex flex-col gap-4">
    <h2 class="text-h3 font-bold text-ink-heading">Context</h2>
    <div class="flex flex-wrap items-center gap-4" data-specimen="context">
      <Context :used="9660" :limit="128000" :usage="USAGE" />
      <Context :used="102400" :limit="128000" />
      <Context :used="121600" :limit="128000" />
    </div>
  </section>

  <section class="flex flex-col gap-4">
    <h2 class="text-h3 font-bold text-ink-heading">Checkpoint</h2>
    <div class="flex w-full max-w-md flex-col gap-4 text-body-sm" data-specimen="checkpoint">
      <Message align="end"><MessageContent><Bubble align="end" variant="secondary"><BubbleContent>Rename the button component to action.</BubbleContent></Bubble></MessageContent></Message>
      <Message><MessageContent><p>Renamed Button to Action in components/ui/button.tsx.</p></MessageContent></Message>
      <Checkpoint label="Button renamed" @restore="restored = true" />
      <Message v-if="!restored" align="end"><MessageContent><Bubble align="end" variant="secondary"><BubbleContent>Update the docs to match.</BubbleContent></Bubble></MessageContent></Message>
      <p v-else class="text-caption text-muted-foreground" data-testid="restored">Restored: the later message was removed.</p>
    </div>
  </section>

  <section class="flex flex-col gap-4">
    <h2 class="text-h3 font-bold text-ink-heading">Subagent</h2>
    <div class="flex flex-wrap items-start gap-6" data-specimen="subagent">
      <div class="flex w-full max-w-sm flex-col gap-2"><p class="text-caption text-muted-foreground">Running</p>
        <div class="rounded-lg border-(length:--pl-border-width) border-border bg-card p-4 text-body-sm"><Message><MessageContent class="gap-3"><Trace>
          <Subagent name="research agent" state="running">
            <Tool state="done" command="grep -rn cacheKey scripts" />
            <Tool state="running" command="cat next.config.ts" />
          </Subagent>
        </Trace></MessageContent></Message></div></div>
      <div class="flex w-full max-w-sm flex-col gap-2"><p class="text-caption text-muted-foreground">Done (open) with its result</p>
        <div class="rounded-lg border-(length:--pl-border-width) border-border bg-card p-4 text-body-sm"><Message><MessageContent class="gap-3"><Trace>
          <Subagent name="research agent" state="done" default-open>
            <Tool state="done" command="grep -rn cacheKey scripts" />
            <template #result><p>The cache is keyed on the commit SHA. Key it on the image directory instead.</p></template>
          </Subagent>
        </Trace></MessageContent></Message></div></div>
      <div class="flex w-full max-w-sm flex-col gap-2"><p class="text-caption text-muted-foreground">Failed</p>
        <div class="rounded-lg border-(length:--pl-border-width) border-border bg-card p-4 text-body-sm"><Trace>
          <Subagent name="review agent" state="error" error="Error: the agent stopped after 3 tool calls (limit reached).">
            <Tool state="done" command="pnpm lint" />
          </Subagent>
        </Trace></div></div>
    </div>
  </section>

  <section class="flex flex-col gap-4">
    <h2 class="text-h3 font-bold text-ink-heading">Model Selector</h2>
    <div class="flex max-w-xl flex-col gap-4" data-specimen="model">
      <InputGroup>
        <InputGroupTextarea placeholder="Ask the agent to change your code…" :rows="2" />
        <InputGroupAddon align="block-end">
          <ModelSelector v-model:model="model" v-model:effort="effort" :providers="PROVIDERS" />
          <InputGroupButton size="icon-sm" variant="default" class="ml-auto" aria-label="Send"><Icon name="send" /></InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup class="opacity-(--pl-opacity-disabled)">
        <InputGroupTextarea placeholder="Ask the agent to change your code…" disabled :rows="2" />
        <InputGroupAddon align="block-end">
          <ModelSelector v-model:model="model" v-model:effort="effort" :providers="PROVIDERS" disabled />
          <InputGroupButton size="icon-sm" variant="default" class="ml-auto" aria-label="Send" disabled><Icon name="send" /></InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <p class="text-caption text-muted-foreground" data-testid="model-value">{{ model }} / {{ effort }}</p>
    </div>
  </section>
</template>
