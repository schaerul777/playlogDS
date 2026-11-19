import { Button } from "@workspace/ui/components/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@workspace/ui/components/hover-card"
import { Progress, ProgressLabel, ProgressValue } from "@workspace/ui/components/progress"
import { Icon } from "@workspace/ui/icons/icon" // Playlog: brand icon set
import { cn } from "@workspace/ui/lib/utils" // Playlog: brand-aware merger

type ContextLevel = "low" | "medium" | "near-full"

function formatTokens(value: number) {
  if (value < 1000) {
    return String(value)
  }
  return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`
}

// Playlog: COMPONENT-SPECS Context. A Hover Card opened from a Button `outline` `sm` ("7% context"), showing how much of the
// model's context window is used with our Progress bar. Levels: low under 75% (fill Green), medium 75–89% (fill
// `pl-warning`, `warning` icon, "Getting full" in `pl-warning-text`), near-full 90% and above (fill `pl-danger`,
// `alert-circle` icon, a sentence in `pl-danger-text`): colour is never the only cue. `limit` is the model's window and is
// always passed in, never read from a provider.
function getContextLevel(percent: number): ContextLevel {
  return percent >= 90 ? "near-full" : percent >= 75 ? "medium" : "low"
}

function Context({
  used,
  limit,
  usage,
  className,
}: {
  /** Tokens used so far. */
  used: number
  /** The model's context window, in tokens. */
  limit: number
  /** Optional breakdown rows, for example Input, Output, Reasoning. */
  usage?: { label: string; value: number }[]
  className?: string
}) {
  const percent = Math.min(100, Math.round((used / limit) * 100))
  const level = getContextLevel(percent)
  const summary = `${formatTokens(used)} / ${formatTokens(limit)}`

  return (
    <HoverCard>
      <HoverCardTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className={className}
            aria-label={`Context window ${percent}% used, ${formatTokens(used)} of ${formatTokens(limit)} tokens`}
          />
        }
      >
        {level === "medium" ? <Icon name="warning" /> : null}
        {level === "near-full" ? <Icon name="alert-circle" /> : null}
        {percent}% context
      </HoverCardTrigger>
      <HoverCardContent align="start" className="flex flex-col gap-3">
        {/* Progress renders its own track and fill; the fill colour follows the level through its slot. */}
        <Progress
          value={percent}
          aria-label="Context used"
          className={cn(
            level === "medium" && "[&_[data-slot=progress-indicator]]:bg-warning",
            level === "near-full" && "[&_[data-slot=progress-indicator]]:bg-danger"
          )}
        >
          <ProgressLabel>Context</ProgressLabel>
          <ProgressValue>{() => summary}</ProgressValue>
        </Progress>
        {level !== "low" ? (
          <p className={cn("text-caption", level === "medium" ? "text-warning-text" : "text-danger-text")}>
            {level === "medium" ? "Getting full" : "Nearly full: the oldest messages may be dropped"}
          </p>
        ) : null}
        {usage?.length ? (
          <dl className="flex flex-col gap-1 text-caption">
            {usage.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-3">
                <dt className="text-muted-foreground">{row.label}</dt>
                <dd className="text-foreground tabular-nums">{formatTokens(row.value)}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </HoverCardContent>
    </HoverCard>
  )
}

export { Context, getContextLevel, formatTokens }
export type { ContextLevel }
