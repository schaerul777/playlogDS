import * as React from "react"

import { Bubble, BubbleContent } from "@workspace/ui/components/bubble"
import { Button } from "@workspace/ui/components/button"
import {
  Message,
  MessageContent,
  MessageFooter,
} from "@workspace/ui/components/message"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { Icon, type IconName } from "@workspace/ui/icons/icon" // Playlog: brand icon set

// Playlog: COMPONENT-SPECS Message (pattern). One turn in a thread. The person's text is a `secondary` Bubble on a
// Message with `align="end"`; the assistant's reply is plain full-width text (a `ghost` bubble) on a Message, with
// actions under it. A thread of these turns is Chat.
function UserMessage({
  children,
  actions,
}: {
  children: React.ReactNode
  /** Usually <UserMessageActions />, shown under the bubble. */
  actions?: React.ReactNode
}) {
  return (
    <Message align="end">
      <MessageContent>
        <Bubble align="end" variant="secondary">
          <BubbleContent>{children}</BubbleContent>
        </Bubble>
        {actions ? <MessageFooter>{actions}</MessageFooter> : null}
      </MessageContent>
    </Message>
  )
}

function AssistantMessage({
  children,
  actions,
}: {
  /** The reply: reasoning, tool lines, text, sources, in order. */
  children: React.ReactNode
  /** Usually <AssistantMessageActions />, shown under the reply. */
  actions?: React.ReactNode
}) {
  return (
    <Message>
      <MessageContent>
        {children}
        {actions ? <MessageFooter className="px-0">{actions}</MessageFooter> : null}
      </MessageContent>
    </Message>
  )
}

// Playlog: Button ghost icon-sm with an aria-label and a Tooltip.
function MessageAction({
  label,
  icon,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "children"> & {
  label: string
  icon: IconName
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={<Button variant="ghost" size="icon-sm" aria-label={label} {...props} />}
      >
        <Icon name={icon} />
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

function useCopy(text: string) {
  const [copied, setCopied] = React.useState(false)
  React.useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])
  return {
    copied,
    copy: () =>
      navigator.clipboard
        .writeText(text)
        .then(() => setCopied(true))
        .catch(() => {}),
  }
}

// Copy, good response, bad response (aria-pressed), retry.
function AssistantMessageActions({
  text,
  onRetry,
  onFeedback,
}: {
  text: string
  onRetry?: () => void
  onFeedback?: (feedback: "like" | "dislike" | null) => void
}) {
  const { copied, copy } = useCopy(text)
  const [feedback, setFeedback] = React.useState<"like" | "dislike" | null>(null)
  const choose = (next: "like" | "dislike") => {
    const value = feedback === next ? null : next
    setFeedback(value)
    onFeedback?.(value)
  }

  return (
    <>
      <MessageAction label={copied ? "Copied" : "Copy"} icon={copied ? "check" : "clipboard"} onClick={copy} />
      <MessageAction
        label="Good response"
        icon="thumbs-up"
        aria-pressed={feedback === "like"}
        onClick={() => choose("like")}
      />
      <MessageAction
        label="Bad response"
        icon="thumbs-down"
        aria-pressed={feedback === "dislike"}
        onClick={() => choose("dislike")}
      />
      {onRetry ? <MessageAction label="Retry" icon="refresh" onClick={onRetry} /> : null}
    </>
  )
}

// Copy and edit, for the person's own message.
function UserMessageActions({ text, onEdit }: { text: string; onEdit?: () => void }) {
  const { copied, copy } = useCopy(text)

  return (
    <>
      <MessageAction label={copied ? "Copied" : "Copy"} icon={copied ? "check" : "clipboard"} onClick={copy} />
      {onEdit ? <MessageAction label="Edit" icon="edit" onClick={onEdit} /> : null}
    </>
  )
}

export {
  UserMessage,
  AssistantMessage,
  MessageAction,
  AssistantMessageActions,
  UserMessageActions,
}
