import * as React from "react"

import { Message, MessageContent } from "@workspace/ui/components/message"
import { Bubble, BubbleContent } from "@workspace/ui/components/bubble"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupTextarea } from "@workspace/ui/components/input-group"
import { Icon } from "@workspace/ui/icons/icon"
import { Trace } from "@workspace/ui/components/trace"
import {
  ChainOfThought,
  ChainOfThoughtBadges,
  ChainOfThoughtStep,
} from "@workspace/ui/components/ai-elements/chain-of-thought"
import { Checkpoint } from "@workspace/ui/components/ai-elements/checkpoint"
import { Context } from "@workspace/ui/components/ai-elements/context"
import { ModelSelector, type ModelProvider } from "@workspace/ui/components/ai-elements/model-selector"
import { Plan, type PlanStep } from "@workspace/ui/components/ai-elements/plan"
import { Queue, type QueueTodo } from "@workspace/ui/components/ai-elements/queue"
import { Subagent } from "@workspace/ui/components/ai-elements/subagent"
import { Task, TaskStep } from "@workspace/ui/components/ai-elements/task"
import { Tool } from "@workspace/ui/components/ai-elements/tool"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-h3 font-bold text-ink-heading">{title}</h2>
      {children}
    </section>
  )
}

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="text-caption text-muted-foreground">{children}</p>
}

function Panel({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      {label ? <Caption>{label}</Caption> : null}
      <div className="rounded-lg border-(length:--pl-border-width) border-border bg-card p-4 text-body-sm">{children}</div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Static mock data. Nothing here calls a model, a provider or a network.
// ---------------------------------------------------------------------------

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
  {
    id: "2",
    title: "Write the migration guide",
    description: "Cover the renamed props and the new data attributes.",
    status: "completed",
  },
  { id: "3", title: "Fix the focus ring on the select trigger", description: "It is clipped by overflow-hidden on the field.", status: "in-progress" },
  { id: "4", title: "Update the registry snapshots", status: "pending" },
  { id: "5", title: "Add tests for the combobox", status: "pending" },
]

const PROVIDERS: ModelProvider[] = [
  {
    name: "Provider A",
    models: [
      { value: "alpha-large", label: "Alpha Large", badge: "New" },
      { value: "alpha-small", label: "Alpha Small" },
    ],
  },
  {
    name: "Provider B",
    models: [
      { value: "beta-2", label: "Beta 2" },
      { value: "beta-1", label: "Beta 1", disabled: true },
    ],
  },
]

const SEARCH_HOSTS = ["nextjs.org", "vercel.com"]

function ChainOfThoughtExample() {
  return (
    <Section title="Chain of Thought">
      <Caption>
        A summary line that opens into the steps the agent took. Open while it runs, closed once the reply starts, and a
        failed step opens by default.
      </Caption>
      <div className="flex flex-wrap items-start gap-6">
        <Panel label="Running (open)">
          <Trace>
            <ChainOfThought running>
              <ChainOfThoughtStep title="Read the build log for dpl_8Kx2" icon="terminal" />
              <ChainOfThoughtStep title="Searching the web for image cache key" status="running" />
            </ChainOfThought>
          </Trace>
        </Panel>
        <Panel label="Done (closed)">
          <Trace>
            <ChainOfThought>
              <ChainOfThoughtStep title="Read the build log for dpl_8Kx2" icon="terminal" />
              <ChainOfThoughtStep title="Searched the web for image cache key">
                <ChainOfThoughtBadges items={SEARCH_HOSTS} />
              </ChainOfThoughtStep>
            </ChainOfThought>
          </Trace>
        </Panel>
        <Panel label="Done (open), one failed">
          <Trace>
            <ChainOfThought defaultOpen failed={1}>
              <ChainOfThoughtStep title="Searched the code for cacheKey">
                <ChainOfThoughtBadges items={["next.config.ts", "scripts/optimize-images.ts"]} />
              </ChainOfThoughtStep>
              <ChainOfThoughtStep title="Failed to read the deploy settings" status="error">
                {"Error: 403 Forbidden"}
              </ChainOfThoughtStep>
            </ChainOfThought>
          </Trace>
        </Panel>
      </div>
    </Section>
  )
}

function PlanTaskExample() {
  return (
    <Section title="Plan and Task">
      <Caption>
        Plan lists every step from the start, with a state on each. Task shows a step once the agent takes it; the running
        task is open and each task closes when it is done.
      </Caption>
      <div className="flex flex-wrap items-start gap-6">
        <Panel label="Plan: every step state">
          <Trace>
            <Plan title="Plan: migrate to Base UI" steps={PLAN_STEPS} />
          </Trace>
        </Panel>
        <Panel label="Plan with a description, closed">
          <Trace>
            <Plan
              title="Plan: add dark mode"
              defaultOpen={false}
              description="Store the theme in a cookie so the server renders the right one."
              steps={[
                { title: "Add a dark variant to the tokens", state: "done" },
                { title: "Add a toggle to the settings page", state: "pending" },
              ]}
            />
          </Trace>
        </Panel>
        <Panel label="Task: running, failed and done">
          <Trace>
            <Task title="Updating the page metadata" status="running">
              <TaskStep title="Searched for app/page.tsx" />
              <TaskStep title="Reading app/layout.tsx" icon="sticky-note" status="running" />
            </Task>
            <Task title="Failed to update the sitemap" status="error" defaultOpen>
              <TaskStep title="Failed to read sitemap.ts" icon="sticky-note" status="error" />
            </Task>
            <Task title="Found the project files">
              <TaskStep title="Searched for app/page.tsx" />
              <TaskStep title="Read app/page.tsx" icon="sticky-note" href="#files" />
            </Task>
          </Trace>
        </Panel>
      </div>
    </Section>
  )
}

function QueueExample() {
  return (
    <Section title="Queue">
      <Caption>The agent&apos;s todo list, read-only. To do is open, Completed is closed; a todo with a description opens to it.</Caption>
      <div className="flex flex-wrap items-start gap-6">
        <Panel label="Mixed">
          <Trace>
            <Queue todos={TODOS} />
          </Trace>
        </Panel>
        <Panel label="Only completed">
          <Trace>
            <Queue todos={TODOS.filter((todo) => todo.status === "completed")} />
          </Trace>
        </Panel>
        <Panel label="Empty (renders nothing)">
          <Queue todos={[]} />
          <Caption>No output.</Caption>
        </Panel>
      </div>
    </Section>
  )
}

function ContextExample() {
  return (
    <Section title="Context">
      <Caption>
        Hover or focus the button. Under 75% is low, 75 to 89% medium, 90% and above near-full: the bar colour changes and
        an icon and a sentence say it too.
      </Caption>
      <div className="flex flex-wrap items-center gap-4">
        <Context
          used={9660}
          limit={128000}
          usage={[
            { label: "Input", value: 8420 },
            { label: "Output", value: 260 },
            { label: "Reasoning", value: 980 },
          ]}
        />
        <Context used={102400} limit={128000} />
        <Context used={121600} limit={128000} />
      </div>
    </Section>
  )
}

function CheckpointExample() {
  const [restored, setRestored] = React.useState(false)
  return (
    <Section title="Checkpoint">
      <Caption>A marker after a turn. Restore asks first, because every later message is removed.</Caption>
      <div className="flex w-full max-w-md flex-col gap-4 text-body-sm">
        <Message align="end">
          <MessageContent>
            <Bubble align="end" variant="secondary">
              <BubbleContent>Rename the button component to action.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageContent>
            <p>Renamed Button to Action in components/ui/button.tsx.</p>
          </MessageContent>
        </Message>
        <Checkpoint label="Button renamed" onRestore={() => setRestored(true)} />
        {!restored ? (
          <Message align="end">
            <MessageContent>
              <Bubble align="end" variant="secondary">
                <BubbleContent>Update the docs to match.</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        ) : (
          <Caption>Restored: the later message was removed.</Caption>
        )}
      </div>
    </Section>
  )
}

function SubagentExample() {
  return (
    <Section title="Subagent">
      <Caption>Work handed to a subagent, nested in the agent&apos;s message. Open while it runs, closed when it is done.</Caption>
      <div className="flex flex-wrap items-start gap-6">
        <Panel label="Running">
          <Message>
            <MessageContent className="gap-3">
              <Trace>
                <Subagent name="research agent" state="running">
                  <Tool state="done" command="grep -rn cacheKey scripts" />
                  <Tool state="running" command="cat next.config.ts" />
                </Subagent>
              </Trace>
            </MessageContent>
          </Message>
        </Panel>
        <Panel label="Done (open) with its result">
          <Message>
            <MessageContent className="gap-3">
              <Trace>
                <Subagent
                  name="research agent"
                  state="done"
                  defaultOpen
                  result={<p>The cache is keyed on the commit SHA. Key it on the image directory instead.</p>}
                >
                  <Tool state="done" command="grep -rn cacheKey scripts" />
                </Subagent>
              </Trace>
            </MessageContent>
          </Message>
        </Panel>
        <Panel label="Failed">
          <Trace>
            <Subagent name="review agent" state="error" error={"Error: the agent stopped after 3 tool calls (limit reached)."}>
              <Tool state="done" command="pnpm lint" />
            </Subagent>
          </Trace>
        </Panel>
      </div>
    </Section>
  )
}

function ModelSelectorExample() {
  const [model, setModel] = React.useState("alpha-large")
  const [effort, setEffort] = React.useState("medium")
  const bar = (disabled?: boolean) => (
    <InputGroup className={disabled ? "opacity-(--pl-opacity-disabled)" : undefined}>
      <InputGroupTextarea placeholder="Ask the agent to change your code…" disabled={disabled} rows={2} />
      <InputGroupAddon align="block-end">
        <ModelSelector
          providers={PROVIDERS}
          model={model}
          onModelChange={setModel}
          effort={effort}
          onEffortChange={setEffort}
          disabled={disabled}
        />
        <InputGroupButton size="icon-sm" variant="default" className="ml-auto" aria-label="Send" disabled={disabled}>
          <Icon name="send" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
  return (
    <Section title="Model Selector">
      <Caption>
        Two menus in the Prompt Input toolbar: the model, grouped by provider (a disabled model, a New badge), and the effort.
        Enter or Space opens, arrows move, typing jumps, Escape closes and returns focus. Static example names only.
      </Caption>
      <div className="flex w-full max-w-xl flex-col gap-4">
        {bar()}
        <Caption>Disabled</Caption>
        {bar(true)}
      </div>
    </Section>
  )
}

export function AgentSection() {
  return (
    <>
      <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">Agent</p>
      <ChainOfThoughtExample />
      <PlanTaskExample />
      <QueueExample />
      <ContextExample />
      <CheckpointExample />
      <SubagentExample />
      <ModelSelectorExample />
    </>
  )
}
