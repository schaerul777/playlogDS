import * as React from "react"

import { Icon } from "@workspace/ui/icons/icon"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@workspace/ui/components/attachment"
import { Bubble, BubbleContent } from "@workspace/ui/components/bubble"
import { Button } from "@workspace/ui/components/button"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@workspace/ui/components/code-block"
import { Marker, MarkerContent, MarkerIcon } from "@workspace/ui/components/marker"
import { Message, MessageAvatar, MessageContent, MessageFooter, MessageHeader } from "@workspace/ui/components/message"
import { Spinner } from "@workspace/ui/components/spinner"
import { Trace } from "@workspace/ui/components/trace"
import { useHighlightedCode } from "@workspace/ui/hooks/use-highlighted-code"
import {
  AssistantMessage,
  AssistantMessageActions,
  UserMessage,
  UserMessageActions,
} from "@workspace/ui/components/ai-elements/message"
import {
  Chat,
  ChatEmpty,
  ChatFooter,
  ChatHeader,
  ChatThread,
  ChatTurn,
} from "@workspace/ui/components/ai-elements/chat"
import { Confirmation } from "@workspace/ui/components/ai-elements/confirmation"
import { InlineCitation } from "@workspace/ui/components/ai-elements/inline-citation"
import { PromptInput } from "@workspace/ui/components/ai-elements/prompt-input"
import { Reasoning } from "@workspace/ui/components/ai-elements/reasoning"
import { Sources } from "@workspace/ui/components/ai-elements/sources"
import { Suggestion, Suggestions } from "@workspace/ui/components/ai-elements/suggestion"
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

// ---------------------------------------------------------------------------
// Static mock data. Nothing here calls a model or a network.
// ---------------------------------------------------------------------------

const SOURCES = {
  method: {
    url: "https://docs.playlog.example/reach-methodology",
    title: "Reach methodology",
    description: "How reach is counted per screen and per period.",
  },
  cities: {
    url: "https://docs.playlog.example/city-report-q3-2025",
    title: "City report, Q3 2025",
    description: "Impressions and reach for 25 cities, July to September 2025.",
  },
  audit: {
    url: "https://docs.playlog.example/screen-audit",
    title: "Screen audit 2025",
    description: "Which screens were live, by city and product line.",
  },
}

const QUERY = `SELECT city, SUM(impressions) AS impressions, MAX(reach) AS reach
FROM city_report
WHERE period = 'Q3 2025'
GROUP BY city
ORDER BY reach DESC
LIMIT 3;`

const DIFF = `const periods = ["Q1 2025", "Q2 2025"]
const periods = ["Q1 2025", "Q2 2025", "Q3 2025"]
const label = (p: string) => p.toUpperCase()`

function HighlightedCode({
  code,
  language,
  title,
  lineNumbers,
  variants,
  size,
  wrap,
  variant,
  className,
}: {
  code: string
  language: string
  title?: string
  lineNumbers?: boolean
  variants?: Record<number, "added" | "removed" | "highlighted">
  size?: "default" | "sm"
  wrap?: boolean
  variant?: "default" | "destructive"
  className?: string
}) {
  const lines = useHighlightedCode(code, language)
  return (
    <CodeBlock size={size} variant={variant} className={className}>
      {title ? (
        <CodeBlockHeader>
          <CodeBlockTitle>{title}</CodeBlockTitle>
          <CodeBlockActions>
            <CodeBlockCopyButton value={code} />
          </CodeBlockActions>
        </CodeBlockHeader>
      ) : (
        <CodeBlockActions>
          <CodeBlockCopyButton value={code} />
        </CodeBlockActions>
      )}
      <CodeBlockContent lineNumbers={lineNumbers} wrap={wrap}>
        {lines.map((line, index) => (
          <CodeBlockLine key={index} variant={variants?.[index + 1]}>
            {line}
          </CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  )
}

// ---------------------------------------------------------------------------
// A full static thread: every part in order.
// ---------------------------------------------------------------------------

function StaticTurns() {
  return (
    <>
      <ChatTurn id="u1" anchor>
        <UserMessage
          actions={<UserMessageActions text="Which three cities had the highest reach in Q3 2025?" onEdit={() => {}} />}
        >
          Which three cities had the highest reach in Q3 2025?
        </UserMessage>
      </ChatTurn>
      <ChatTurn id="a1">
        <AssistantMessage
          actions={
            <AssistantMessageActions
              text="Jakarta Selatan, Surabaya and Bandung led reach in Q3 2025."
              onRetry={() => {}}
            />
          }
        >
          <Trace>
            <Reasoning duration={4}>
              The city report is keyed by period, so I can group Q3 2025 by city and sort by reach. I should check the
              methodology before I compare reach across cities.
            </Reasoning>
            <Tool
              state="done"
              command="query city_report --period Q3 2025"
              output={"city              impressions   reach\nJakarta Selatan   4.218.300     1.284.000\nSurabaya          3.102.900     902.400\nBandung           2.640.100     781.200"}
            />
          </Trace>
          <p>
            Jakarta Selatan, Surabaya and Bandung led reach in Q3 2025 (July to September, 25 cities).{" "}
            <InlineCitation source={SOURCES.cities} />
          </p>
          <ul className="flex list-disc flex-col gap-1 pl-5">
            <li>Jakarta Selatan: 1,28 M reach from 4,2 M impressions.</li>
            <li>Surabaya: 902 K reach from 3,1 M impressions.</li>
            <li>
              Bandung: 781 K reach from 2,6 M impressions. Reach counts each person once per screen and period.{" "}
              <InlineCitation source={SOURCES.method} />
            </li>
          </ul>
          <HighlightedCode code={QUERY} language="sql" title="reach-by-city.sql" size="sm" />
          <Sources sources={[SOURCES.cities, SOURCES.method, SOURCES.audit]} />
        </AssistantMessage>
      </ChatTurn>
      <ChatTurn id="u2" anchor>
        <UserMessage>Check the screen audit against this and clean up the old export.</UserMessage>
      </ChatTurn>
      <ChatTurn id="a2">
        <AssistantMessage>
          <Trace>
            <Reasoning running>
              Comparing the audit with the city report. Deleting the old export cannot be undone, so I should ask first.
            </Reasoning>
          </Trace>
          <Confirmation
            title="Run rm -rf exports/q3-old?"
            description="The command deletes the old export in this project."
            onApprove={() => {}}
            onDeny={() => {}}
          />
          <Marker role="status">
            <MarkerIcon>
              <Spinner className="size-4" />
            </MarkerIcon>
            <MarkerContent>Waiting for your answer…</MarkerContent>
          </Marker>
        </AssistantMessage>
      </ChatTurn>
    </>
  )
}

// ---------------------------------------------------------------------------
// An interactive thread: submit adds a turn that "streams" a canned reply from memory. Escape or Stop ends it.
// ---------------------------------------------------------------------------

const CANNED =
  "Reach counts each person once per screen and period, so adding two periods together can count the same person twice. Compare periods side by side instead."

function LiveChat() {
  const [turns, setTurns] = React.useState<{ id: string; text: string; reply: string; done: boolean }[]>([])
  const [streaming, setStreaming] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setInterval> | null>(null)
  const idRef = React.useRef(0)

  function stop() {
    if (timer.current) clearInterval(timer.current)
    timer.current = null
    setStreaming(false)
    setTurns((current) => current.map((t) => ({ ...t, done: true })))
  }

  function send(text: string) {
    const id = `live-${++idRef.current}`
    const words = CANNED.split(" ")
    let count = 0
    setTurns((current) => [...current, { id, text, reply: "", done: false }])
    setStreaming(true)
    timer.current = setInterval(() => {
      count += 1
      setTurns((current) =>
        current.map((t) => (t.id === id ? { ...t, reply: words.slice(0, count).join(" "), done: count >= words.length } : t))
      )
      if (count >= words.length) {
        if (timer.current) clearInterval(timer.current)
        timer.current = null
        setStreaming(false)
      }
    }, 45)
  }

  React.useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current)
    },
    []
  )

  return (
    <Chat>
      <ChatHeader
        title="New thread"
        description="Ask about reach, impressions and screens."
        action={
          <Button
            variant="outline"
            size="icon"
            aria-label="Reset conversation"
            disabled={streaming}
            onClick={() => setTurns([])}
          >
            <Icon name="refresh" />
          </Button>
        }
      />
      {turns.length === 0 ? (
        <div className="min-h-0 flex-1">
          <ChatEmpty>
            <Suggestions className="justify-center">
              <Suggestion suggestion="Top cities by reach in Q3 2025" onSuggestionClick={send} />
              <Suggestion suggestion="Impressions by product line" onSuggestionClick={send} />
              <Suggestion suggestion="Which screens were offline?" onSuggestionClick={send} />
            </Suggestions>
          </ChatEmpty>
        </div>
      ) : (
        <ChatThread busy={streaming}>
          {turns.map((turn) => (
            <React.Fragment key={turn.id}>
              <ChatTurn id={`${turn.id}-u`} anchor>
                <UserMessage>{turn.text}</UserMessage>
              </ChatTurn>
              <ChatTurn id={`${turn.id}-a`}>
                <AssistantMessage
                  actions={turn.done ? <AssistantMessageActions text={turn.reply} onRetry={() => send(turn.text)} /> : undefined}
                >
                  {turn.reply === "" ? (
                    <Marker role="status">
                      <MarkerIcon>
                        <Spinner className="size-4" />
                      </MarkerIcon>
                      <MarkerContent>Thinking…</MarkerContent>
                    </Marker>
                  ) : (
                    <p>{turn.reply}</p>
                  )}
                </AssistantMessage>
              </ChatTurn>
            </React.Fragment>
          ))}
        </ChatThread>
      )}
      <ChatFooter>
        <PromptInput
          status={streaming ? "streaming" : "ready"}
          onSubmit={({ text }) => send(text)}
          onStop={stop}
          placeholder="Ask about reach, impressions or screens"
        />
      </ChatFooter>
    </Chat>
  )
}

function ThreadExample() {
  return (
    <Section title="Chat">
      <Caption>
        Static thread: person and assistant turns, reasoning (closed, open while running), a tool that ran, inline
        citations, a code block, sources, a pending approval and a status marker. Message actions sit under each turn.
      </Caption>
      <div className="h-160 overflow-hidden rounded-lg border-(length:--pl-border-width) border-border bg-background">
        <Chat>
          <ChatHeader title="Q3 reach review" description="Static mock conversation, no model." />
          <ChatThread>
            <StaticTurns />
          </ChatThread>
          <ChatFooter>
            <Suggestions>
              <Suggestion suggestion="Compare with Q2 2025" onSuggestionClick={() => {}} />
              <Suggestion suggestion="Export as CSV" onSuggestionClick={() => {}} />
            </Suggestions>
            <PromptInput status="disabled" placeholder="Answer the question above to continue" />
          </ChatFooter>
        </Chat>
      </div>
      <Caption>
        Live thread (canned reply, streamed from memory): type and press Enter, Shift+Enter adds a line, Escape stops
        the reply. Scroll up while it streams and the thread stops following.
      </Caption>
      <div className="h-128 overflow-hidden rounded-lg border-(length:--pl-border-width) border-border bg-background">
        <LiveChat />
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Parts: every variant and state on its own.
// ---------------------------------------------------------------------------

function BubbleExample() {
  return (
    <Section title="Bubble and Message">
      <Caption>Bubble variants (person uses secondary, assistant uses ghost), with header, footer and avatar.</Caption>
      <div className="grid max-w-2xl gap-3">
        {(["default", "secondary", "muted", "tinted", "outline", "ghost", "destructive"] as const).map((variant) => (
          <Message key={variant}>
            <MessageContent>
              <Bubble variant={variant}>
                <BubbleContent>variant={variant}: Reach counts each person once per screen and period.</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        ))}
        <Message>
          <MessageAvatar>
            <Avatar size="sm">
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <MessageHeader>Assistant · 10:42</MessageHeader>
            <Bubble variant="outline">
              <BubbleContent>With an avatar, a header and a footer.</BubbleContent>
            </Bubble>
            <MessageFooter>Edited</MessageFooter>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageContent>
            <Bubble align="end" variant="secondary">
              <BubbleContent render={<a href="#link" />}>An interactive bubble (a link): hover and focus it.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      </div>
    </Section>
  )
}

function MarkerExample() {
  return (
    <Section title="Marker">
      <div className="grid max-w-md gap-3">
        <Marker variant="separator">
          <MarkerContent>Today</MarkerContent>
        </Marker>
        <Marker role="status">
          <MarkerIcon>
            <Spinner className="size-4" />
          </MarkerIcon>
          <MarkerContent>Checking the screen audit…</MarkerContent>
        </Marker>
        <Marker>
          <MarkerIcon>
            <Icon name="info" />
          </MarkerIcon>
          <MarkerContent>
            Reach is counted per period. <a href="#method">See the methodology</a>
          </MarkerContent>
        </Marker>
        <Marker variant="border">
          <MarkerContent>Thread started from a suggestion</MarkerContent>
        </Marker>
      </div>
    </Section>
  )
}

function TraceExample() {
  return (
    <Section title="Reasoning, Tool, Confirmation, Sources">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <Caption>Reasoning: open while thinking, closed when done (reopen it).</Caption>
          <Trace>
            <Reasoning running>
              Three phases in the log. Install and build are normal, so the slow part is probably the image step.
            </Reasoning>
            <Reasoning duration={5}>The deploy is slow because the cache key includes the commit hash.</Reasoning>
          </Trace>
          <Caption>Tool: running, done, failed (open), denied, pending.</Caption>
          <Trace>
            <Tool state="running" command="pnpm test" />
            <Tool state="done" command="git status --short" output={" M apps/web/src/App.tsx\n M packages/ui/package.json"} />
            <Tool state="error" command="pnpm build" output="Command timed out after 120 seconds." />
            <Tool state="denied" command="rm -rf dist" />
            <Tool state="pending" command="pnpm lint" />
          </Trace>
        </div>
        <div className="flex flex-col gap-3">
          <Caption>Confirmation (awaiting approval), and Sources.</Caption>
          <Confirmation
            title="Run pnpm build?"
            description="The command runs in this project."
            onApprove={() => {}}
            onDeny={() => {}}
          />
          <Confirmation title="Run pnpm build?" description="Disabled while the reply is being sent." disabled />
          <Sources sources={[SOURCES.cities, SOURCES.method]} />
          <p className="text-body-sm">
            Inline citations sit in the sentence: Reach is counted once per screen and period.{" "}
            <InlineCitation source={SOURCES.method} /> Impressions are not deduplicated.{" "}
            <InlineCitation source={SOURCES.cities} />
          </p>
        </div>
      </div>
    </Section>
  )
}

function CodeExample() {
  return (
    <Section title="Code Block">
      <div className="grid gap-4 md:grid-cols-2">
        <HighlightedCode code={QUERY} language="sql" title="reach-by-city.sql" lineNumbers />
        <HighlightedCode
          code={DIFF}
          language="typescript"
          title="periods.ts"
          lineNumbers
          variants={{ 1: "removed", 2: "added", 3: "highlighted" }}
        />
        <HighlightedCode code={"pnpm build\npnpm: command not found"} language="bash" size="sm" variant="destructive" title="Failed" />
        <CodeBlock size="sm">
          <CodeBlockContent wrap>{"Plain output with no language, wrapped. A long line wraps instead of scrolling: the quick brown fox jumps over the lazy dog."}</CodeBlockContent>
          <CodeBlockFooter>
            <span className="text-caption">Footer text</span>
          </CodeBlockFooter>
        </CodeBlock>
      </div>
    </Section>
  )
}

function AttachmentExample() {
  return (
    <Section title="Attachment">
      <AttachmentGroup>
        <Attachment>
          <AttachmentMedia>
            <Icon name="sticky-note" />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>q3-reach.csv</AttachmentTitle>
            <AttachmentDescription>CSV · 48 KB</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Remove q3-reach.csv">
              <Icon name="close" />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
        <Attachment state="idle">
          <AttachmentMedia>
            <Icon name="sticky-note" />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>Drop a file</AttachmentTitle>
            <AttachmentDescription>Idle</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
        <Attachment state="uploading">
          <AttachmentMedia>
            <Spinner className="size-4" />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>screens.xlsx</AttachmentTitle>
            <AttachmentDescription>Uploading…</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
        <Attachment state="error">
          <AttachmentMedia>
            <Icon name="alert-circle" />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>audit.pdf</AttachmentTitle>
            <AttachmentDescription>Failed: larger than 10 MB</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
        <Attachment size="sm">
          <AttachmentMedia>
            <Icon name="sticky-note" />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>sm.csv</AttachmentTitle>
          </AttachmentContent>
        </Attachment>
        <Attachment size="xs">
          <AttachmentMedia>
            <Icon name="sticky-note" />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>xs.csv</AttachmentTitle>
          </AttachmentContent>
        </Attachment>
        <Attachment orientation="vertical">
          <AttachmentMedia variant="image">
            <div className="flex size-full items-center justify-center bg-accent text-ink-heading">
              <Icon name="tv" />
            </div>
          </AttachmentMedia>
        </Attachment>
      </AttachmentGroup>
    </Section>
  )
}

function PromptInputExample() {
  return (
    <Section title="Prompt Input">
      <div className="grid max-w-3xl gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Caption>Empty (send disabled)</Caption>
          <PromptInput />
        </div>
        <div className="flex flex-col gap-2">
          <Caption>Filled, with attachments</Caption>
          <PromptInput
            defaultText="Compare Q3 2025 with Q2 2025 by city."
            defaultFiles={[new File([""], "q3-reach.csv"), new File([""], "q2-reach.csv")]}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Caption>Streaming (Stop replaces Send, Escape stops)</Caption>
          <PromptInput status="streaming" defaultText="Keep this text while the reply streams." />
        </div>
        <div className="flex flex-col gap-2">
          <Caption>Disabled</Caption>
          <PromptInput status="disabled" />
        </div>
      </div>
    </Section>
  )
}

export function ChatSection() {
  return (
    <>
      <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">Chat</p>
      <ThreadExample />
      <BubbleExample />
      <MarkerExample />
      <TraceExample />
      <CodeExample />
      <AttachmentExample />
      <PromptInputExample />
    </>
  )
}
