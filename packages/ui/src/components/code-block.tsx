import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

import { Button } from "@workspace/ui/components/button"
import { Icon } from "@workspace/ui/icons/icon" // Playlog: brand icon set

// Playlog: COMPONENT-SPECS Code Block. Radius 8, 1px `border`, `muted` fill (an inset area), foreground text, mono font
// (Reddit Mono, code only). Syntax colours are the --pl-syntax-* tokens through shiki's CSS-variable theme (see
// lib/highlighter.tsx); everything else is foreground. Diff lines carry a + or − marker, not only a tint.
const codeBlockVariants = cva(
  [
    "group/code-block relative flex w-full min-w-0 flex-col overflow-hidden rounded-lg border-(length:--pl-border-width) bg-muted text-body-sm data-[size=sm]:text-caption",
    // Playlog: the code viewport is focusable, so the block takes the 2px focus ring when it has focus.
    "has-[>[data-slot=code-block-content]:focus-visible]:outline-(length:--pl-focus-ring-width) has-[>[data-slot=code-block-content]:focus-visible]:outline-offset-(--pl-focus-ring-offset) has-[>[data-slot=code-block-content]:focus-visible]:outline-solid has-[>[data-slot=code-block-content]:focus-visible]:outline-ring",
    // Playlog: syntax colours (tokens only).
    "[--shiki-foreground:var(--foreground)] [--shiki-background:transparent] [--shiki-token-keyword:var(--pl-syntax-keyword)] [--shiki-token-string:var(--pl-syntax-string)] [--shiki-token-string-expression:var(--pl-syntax-string)] [--shiki-token-constant:var(--pl-syntax-number)] [--shiki-token-comment:var(--pl-syntax-comment)] [--shiki-token-function:var(--foreground)] [--shiki-token-parameter:var(--foreground)] [--shiki-token-punctuation:var(--foreground)] [--shiki-token-link:var(--pl-syntax-keyword)]",
  ],
  {
    variants: {
      variant: {
        default: "border-border text-foreground",
        destructive: "border-danger-text text-danger-text",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function CodeBlock({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof codeBlockVariants> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="code-block"
      data-variant={variant}
      data-size={size}
      className={cn(codeBlockVariants({ variant }), className)}
      {...props}
    />
  )
}

function CodeBlockHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-header"
      // Playlog: padding 16 16 0 (sm: 12).
      className={cn(
        "flex min-w-0 shrink-0 items-center gap-2 px-4 pt-4 text-muted-foreground group-data-[size=sm]/code-block:px-3 group-data-[size=sm]/code-block:pt-3 group-data-[variant=destructive]/code-block:text-danger-text *:has-[>[data-slot=code-block-title]]:min-w-0",
        className
      )}
      {...props}
    />
  )
}

function CodeBlockTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-title"
      // Playlog: 14/20 medium in Reddit Sans (sm: 12/16).
      className={cn(
        "min-w-0 truncate font-sans text-body-sm font-medium text-foreground group-data-[size=sm]/code-block:text-caption group-data-[variant=destructive]/code-block:text-danger-text [&_svg]:pointer-events-none [&_svg]:inline-block [&_svg]:align-middle [&_svg:not([class*='size-'])]:size-4 group-data-[size=sm]/code-block:[&_svg:not([class*='size-'])]:size-3 *:[svg]:me-2",
        className
      )}
      {...props}
    />
  )
}

function CodeBlockActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-actions"
      // Playlog: floating actions show on hover and on focus-within, and always on touch.
      className={cn(
        "-my-1 ms-auto -me-1.5 flex shrink-0 items-center gap-1 [[data-slot=code-block]>&]:absolute [[data-slot=code-block]>&]:end-3 [[data-slot=code-block]>&]:top-3 [[data-slot=code-block]>&]:z-10 [[data-slot=code-block]>&]:m-0 [[data-slot=code-block]>&]:opacity-0 [[data-slot=code-block]>&]:transition-opacity [[data-slot=code-block]>&]:duration-(--pl-duration-fast) [[data-slot=code-block]>&]:group-focus-within/code-block:opacity-100 [[data-slot=code-block]>&]:group-hover/code-block:opacity-100 group-data-[size=sm]/code-block:[[data-slot=code-block]>&]:end-2 group-data-[size=sm]/code-block:[[data-slot=code-block]>&]:top-2 [[data-slot=code-block]>&]:pointer-coarse:opacity-100 [[data-slot=code-block]>&]:*:[button]:bg-card [[data-slot=code-block]>&]:*:[button]:ring-(length:--pl-border-width) [[data-slot=code-block]>&]:*:[button]:ring-border",
        className
      )}
      {...props}
    />
  )
}

function CodeBlockCopyButton({
  value,
  variant = "ghost",
  size = "icon-xs",
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button> & { value: string }) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) {
      return
    }

    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <>
      <Button
        data-slot="code-block-copy-button"
        data-copied={copied || undefined}
        variant={variant}
        size={size}
        aria-label={copied ? "Copied" : "Copy"}
        className={cn(className)}
        onClick={(event) => {
          onClick?.(event)
          navigator.clipboard
            .writeText(value)
            .then(() => setCopied(true))
            .catch(() => {})
        }}
        {...props}
      >
        {/* Playlog: clipboard, then check for 2s. */}
        <Icon name={copied ? "check" : "clipboard"} />
      </Button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </>
  )
}

function CodeBlockContent({
  className,
  children,
  style,
  wrap = false,
  lineNumbers = false,
  startLine = 1,
  ...props
}: React.ComponentProps<"pre"> & {
  wrap?: boolean
  lineNumbers?: boolean
  startLine?: number
}) {
  return (
    <pre
      data-slot="code-block-content"
      data-wrap={wrap || undefined}
      data-numbered={lineNumbers || undefined}
      dir="ltr"
      tabIndex={0}
      style={{ counterReset: `line ${startLine - 1}`, ...style }}
      // Playlog: Reddit Mono, 14/20 weight 400 (sm: 12/16), padding 16 (sm: 12), thin scrollbar as Message Scroller.
      className={cn(
        "min-h-0 min-w-0 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent overflow-auto p-4 text-start font-mono text-body-sm font-normal outline-none group-data-[size=sm]/code-block:p-3 group-data-[size=sm]/code-block:text-caption group-data-[size=sm]/code-block:font-normal group-has-data-[slot=code-block-footer]/code-block:pb-2 group-has-data-[slot=code-block-header]/code-block:pt-2 group-data-[size=sm]/code-block:group-has-data-[slot=code-block-header]/code-block:pt-1.5 data-wrap:wrap-break-word data-wrap:whitespace-pre-wrap",
        className
      )}
      {...props}
    >
      <code
        data-slot="code-block-code"
        className="grid min-h-lh min-w-max content-start in-data-numbered:grid-cols-[auto_1fr] in-data-wrap:min-w-0"
      >
        {lineNumbers && typeof children === "string"
          ? children
              .replace(/\n$/, "")
              .split("\n")
              .map((line, index) => (
                <CodeBlockLine key={index}>{line}</CodeBlockLine>
              ))
          : children}
      </code>
    </pre>
  )
}

// Playlog: added = success-surface with a + in success-text, removed = danger-surface with a − in danger-text,
// highlighted = surface-selected.
const codeBlockLineVariants = cva(
  "relative -mx-4 block min-h-lh px-4 group-data-[size=sm]/code-block:-mx-3 group-data-[size=sm]/code-block:px-3 before:min-w-6 before:text-end before:text-muted-foreground after:absolute after:start-1 after:top-0 after:select-none in-data-numbered:col-span-2 in-data-numbered:grid in-data-numbered:grid-cols-subgrid in-data-numbered:gap-x-3 in-data-numbered:[counter-increment:line] in-data-numbered:before:content-[counter(line)] in-data-numbered:before:select-none in-data-numbered:supports-[content:counter(line)_/_'']:before:content-[counter(line)_/_'']",
  {
    variants: {
      variant: {
        default: "",
        added: "bg-success-surface after:text-success-text after:content-['+']",
        removed: "bg-danger-surface after:text-danger-text after:content-['−']",
        highlighted: "bg-surface-selected",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function CodeBlockLine({
  className,
  variant = "default",
  children,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof codeBlockLineVariants>) {
  // An empty line holds a newline so copying a selection keeps blank lines.
  const empty =
    children === undefined ||
    children === null ||
    children === "" ||
    (Array.isArray(children) && children.length === 0)

  return (
    <span
      data-slot="code-block-line"
      data-variant={variant}
      className={cn(codeBlockLineVariants({ variant }), className)}
      {...props}
    >
      <span data-slot="code-block-line-content" className="min-w-0">
        {empty ? "\n" : children}
      </span>
    </span>
  )
}

function CodeBlockFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-footer"
      className={cn(
        "flex min-w-0 shrink-0 items-center gap-2 px-4 pb-4 text-muted-foreground group-data-[size=sm]/code-block:px-3 group-data-[size=sm]/code-block:pb-3",
        className
      )}
      {...props}
    />
  )
}

export {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockContent,
  CodeBlockLine,
  CodeBlockFooter,
}
