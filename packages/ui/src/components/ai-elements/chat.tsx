import * as React from "react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@workspace/ui/components/message-scroller"
import { Icon, type IconName } from "@workspace/ui/icons/icon" // Playlog: brand icon set
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

// Playlog: COMPONENT-SPECS Chat. A column: an optional header, the Message Scroller thread, then the footer (suggestions
// and Prompt Input) pinned at the bottom. Give Chat a height. Each turn is a Message inside a ChatTurn; mark the
// person's turn `anchor` so a new question settles near the top and the reply streams in under it.
function Chat({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat"
      className={cn("flex size-full min-h-0 flex-col", className)}
      {...props}
    />
  )
}

function ChatHeader({
  title,
  description,
  action,
  className,
}: {
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div
      data-slot="chat-header"
      className={cn("flex items-start justify-between gap-4 px-6 pt-4 pb-4", className)}
    >
      <div className="flex min-w-0 flex-col gap-0.5">
        <div className="font-heading text-h3 font-bold text-ink-heading">{title}</div>
        {description ? <div className="text-caption text-muted-foreground">{description}</div> : null}
      </div>
      {action}
    </div>
  )
}

// The thread. `busy` is true while a reply streams: the live region waits for the finished row.
function ChatThread({
  children,
  busy,
  className,
}: {
  children: React.ReactNode
  busy?: boolean
  className?: string
}) {
  return (
    <MessageScrollerProvider autoScroll>
      <div data-slot="chat-thread" className={cn("min-h-0 flex-1", className)}>
        <MessageScroller>
          <MessageScrollerViewport>
            <MessageScrollerContent aria-busy={busy} className="mx-auto w-full max-w-3xl py-4">
              {children}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </div>
    </MessageScrollerProvider>
  )
}

function ChatTurn({
  id,
  anchor = false,
  ...props
}: Omit<React.ComponentProps<typeof MessageScrollerItem>, "messageId" | "scrollAnchor"> & {
  id: string
  /** The person's turn: new questions settle near the top. */
  anchor?: boolean
}) {
  return <MessageScrollerItem messageId={id} scrollAnchor={anchor} {...props} />
}

// The empty thread: our Empty with the `lightbulb` tile by default.
function ChatEmpty({
  title = "What should we ask?",
  description = "Ask about your campaigns, screens and reach, or start from a suggestion.",
  icon = "lightbulb",
  children,
}: {
  title?: string
  description?: string
  icon?: IconName
  children?: React.ReactNode
}) {
  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon name={icon} />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {children ? <EmptyContent>{children}</EmptyContent> : null}
    </Empty>
  )
}

function ChatFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-footer"
      className={cn("mx-auto flex w-full max-w-3xl flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

export { Chat, ChatHeader, ChatThread, ChatTurn, ChatEmpty, ChatFooter }
