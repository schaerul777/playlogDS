import { Button } from "@workspace/ui/components/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@workspace/ui/components/hover-card"

type Citation = { url: string; title: string; description?: string }

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

// Playlog: COMPONENT-SPECS Inline Citation. A source that sits in the sentence it supports: Button `secondary` `xs`
// with the hostname, on a Hover Card (width 256) with the title (14/20 semibold), description (14/20 muted) and the
// link (12/16, underlined). Opens after 150ms on hover or focus and closes after 150ms.
function InlineCitation({ source }: { source: Citation }) {
  const host = hostname(source.url)

  return (
    <HoverCard>
      <HoverCardTrigger
        delay={150}
        closeDelay={150}
        render={<Button variant="secondary" size="xs" className="mx-0.5 align-baseline" />}
      >
        {host}
      </HoverCardTrigger>
      <HoverCardContent className="flex w-64 flex-col gap-1">
        <div className="text-label">{source.title}</div>
        {source.description ? (
          <p className="text-body-sm text-muted-foreground">{source.description}</p>
        ) : null}
        <a
          href={source.url}
          target="_blank"
          rel="noreferrer"
          className="rounded-sm text-caption text-muted-foreground underline underline-offset-4 outline-none hover:text-foreground focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring"
        >
          {host}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </HoverCardContent>
    </HoverCard>
  )
}

export { InlineCitation }
export type { Citation }
