import * as React from "react"
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

import { Button } from "@workspace/ui/components/button"

// Playlog: COMPONENT-SPECS Suggestion. A prompt you send without typing: Button `outline` `sm`, label only. The row
// wraps (no hidden suggestions, no edge fade); put it above the Prompt Input.
function Suggestions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="suggestions"
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    />
  )
}

function Suggestion({
  suggestion,
  onSuggestionClick,
  children,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "onClick"> & {
  /** The prompt. It is the label unless you pass children, and it is what `onSuggestionClick` receives. */
  suggestion: string
  onSuggestionClick?: (suggestion: string) => void
}) {
  return (
    <Button
      data-slot="suggestion"
      variant="outline"
      size="sm"
      className={cn("shrink-0", className)}
      onClick={() => onSuggestionClick?.(suggestion)}
      {...props}
    >
      {children ?? suggestion}
    </Button>
  )
}

export { Suggestions, Suggestion }
