import { Icon } from "@workspace/ui/icons/icon" // Playlog: brand icon set
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@workspace/ui/components/trace"

type Source = { url: string; title?: string }

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

// Playlog: COMPONENT-SPECS Sources. A Trace line "Used 3 sources" (icon `globe`) that opens into one link per source:
// the title or hostname and a trailing `arrow-up-right`, with "(opens in a new tab)" for screen readers.
function Sources({ sources }: { sources: Source[] }) {
  if (sources.length === 0) {
    return null
  }

  return (
    <Trace>
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine>
            <TraceIcon>
              <Icon name="globe" />
            </TraceIcon>
            <TraceTitle>
              Used {sources.length} {sources.length === 1 ? "source" : "sources"}
            </TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <Trace>
            {sources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="group/source"
              >
                <TraceLine className="group-hover/source:text-foreground group-hover/source:underline group-hover/source:underline-offset-4">
                  <TraceTitle>
                    {source.title ?? hostname(source.url)}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </TraceTitle>
                  <TraceIcon>
                    <Icon name="arrow-up-right" />
                  </TraceIcon>
                </TraceLine>
              </a>
            ))}
          </Trace>
        </TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  )
}

export { Sources }
export type { Source }
