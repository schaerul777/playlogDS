import * as React from "react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentMedia,
  AttachmentTitle,
} from "@workspace/ui/components/attachment"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"
import { Icon } from "@workspace/ui/icons/icon" // Playlog: brand icon set
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

type PromptInputStatus = "ready" | "streaming" | "disabled"

type PromptInputSubmit = { text: string; files: File[] }

type AttachedFile = { id: string; file: File }

// Playlog: COMPONENT-SPECS Prompt Input. Our Input Group around a Textarea: attached files as Attachment `sm` chips above
// the text, and a toolbar below: attach (Button `outline` `icon-sm`), a slot for the Model Selector (Phase 2) and send
// (Button `default` `icon-sm`), which becomes Stop while the reply streams.
// Keys: Enter sends, Shift+Enter adds a line, Escape stops a running reply.
function PromptInput({
  status = "ready",
  onSubmit,
  onStop,
  placeholder = "Message the assistant",
  defaultText = "",
  defaultFiles = [],
  children,
  className,
}: {
  status?: PromptInputStatus
  onSubmit?: (message: PromptInputSubmit) => void
  onStop?: () => void
  placeholder?: string
  /** Initial text and attached files, for a prefilled field. */
  defaultText?: string
  defaultFiles?: File[]
  /** Toolbar slot between attach and send, for example the Model Selector. */
  children?: React.ReactNode
  className?: string
}) {
  const [text, setText] = React.useState(defaultText)
  const [files, setFiles] = React.useState<AttachedFile[]>(() =>
    defaultFiles.map((file) => ({ id: crypto.randomUUID(), file }))
  )
  const formRef = React.useRef<HTMLFormElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const disabled = status === "disabled"
  const streaming = status === "streaming"
  const canSend = text.trim().length > 0 && !disabled && !streaming

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSend) {
      return
    }
    onSubmit?.({ text: text.trim(), files: files.map((item) => item.file) })
    setText("")
    setFiles([])
  }

  function attach(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files
    if (selected) {
      setFiles((current) => [
        ...current,
        ...Array.from(selected, (file) => ({ id: crypto.randomUUID(), file })),
      ])
    }
    event.target.value = ""
  }

  return (
    <form ref={formRef} onSubmit={submit} className={cn("w-full", className)}>
      <input
        ref={inputRef}
        type="file"
        multiple
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={attach}
      />
      <InputGroup>
        {files.length > 0 && (
          <InputGroupAddon align="block-start" className="flex-wrap gap-2">
            {files.map(({ id, file }) => (
              <Attachment key={id} size="sm">
                <AttachmentMedia>
                  <Icon name="sticky-note" />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>{file.name}</AttachmentTitle>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction
                    aria-label={`Remove ${file.name}`}
                    onClick={() => setFiles((current) => current.filter((item) => item.id !== id))}
                  >
                    <Icon name="close" />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            ))}
          </InputGroupAddon>
        )}
        <InputGroupTextarea
          value={text}
          disabled={disabled}
          placeholder={placeholder}
          aria-label="Message"
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
              event.preventDefault()
              formRef.current?.requestSubmit()
            }
            if (event.key === "Escape" && streaming) {
              event.preventDefault()
              onStop?.()
            }
          }}
          // Playlog: grows up to 8 lines (160), then scrolls.
          className="max-h-40 min-h-10 overflow-y-auto px-3"
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            size="icon-sm"
            variant="outline"
            aria-label="Attach files"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
          >
            <Icon name="attachment" />
          </InputGroupButton>
          <div className="flex min-w-0 flex-1 items-center gap-2">{children}</div>
          {streaming ? (
            <InputGroupButton size="icon-sm" variant="default" aria-label="Stop" onClick={onStop}>
              <Icon name="stop" />
            </InputGroupButton>
          ) : (
            <InputGroupButton
              type="submit"
              size="icon-sm"
              variant="default"
              aria-label="Send"
              disabled={!canSend}
            >
              <Icon name="send" />
            </InputGroupButton>
          )}
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}

export { PromptInput }
export type { PromptInputStatus, PromptInputSubmit }
