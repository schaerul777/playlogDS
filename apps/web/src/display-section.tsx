import * as React from "react"

import { Icon } from "@workspace/ui/icons/icon"
import { AspectRatio } from "@workspace/ui/components/aspect-ratio"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@workspace/ui/components/hover-card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@workspace/ui/components/item"
import { Kbd, KbdGroup } from "@workspace/ui/components/kbd"
import { ScrollArea, ScrollBar } from "@workspace/ui/components/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-h3 font-bold text-ink-heading">{title}</h2>
      {children}
    </section>
  )
}

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="text-caption font-medium text-muted-foreground">{children}</p>
}

// ---------------------------------------------------------------------------
// Empty
// ---------------------------------------------------------------------------

function EmptyExample() {
  return (
    <Section title="Empty">
      <Caption>Empty table state: Empty inside a table body, actions are our Button.</Caption>
      <Card className="gap-0 py-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Product line</TableHead>
              <TableHead numeric>Screens</TableHead>
              <TableHead numeric>Impressions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={4} className="p-0">
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <Icon name="database" />
                    </EmptyMedia>
                    <EmptyTitle>No campaigns yet</EmptyTitle>
                    <EmptyDescription>
                      Campaigns you create or import appear here with their screens and impressions.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Button>
                      <Icon name="plus" data-icon="inline-start" />
                      New campaign
                    </Button>
                    <Button variant="outline">
                      <Icon name="download" data-icon="inline-start" />
                      Import CSV
                    </Button>
                  </EmptyContent>
                </Empty>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="py-0">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Icon name="search" />
              </EmptyMedia>
              <EmptyTitle>No results for “Rotterdam”</EmptyTitle>
              <EmptyDescription>
                Check the spelling or <a href="#">clear the filters</a>.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </Card>
        <Card className="py-0">
          <Empty>
            <EmptyHeader>
              <EmptyMedia>
                <Avatar size="lg">
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
              </EmptyMedia>
              <EmptyTitle>No reports shared with you</EmptyTitle>
              <EmptyDescription>Media variant default: any media, no tile.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline">Ask for access</Button>
            </EmptyContent>
          </Empty>
        </Card>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Kbd
// ---------------------------------------------------------------------------

function KbdExample() {
  return (
    <Section title="Kbd">
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <Kbd>Esc</Kbd>
          <Kbd>↵</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>K</Kbd>
        </div>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <span className="text-caption text-muted-foreground">+</span>
          <Kbd>B</Kbd>
        </KbdGroup>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Toggle sidebar" />}>
            <Icon name="sidebar" />
          </TooltipTrigger>
          <TooltipContent>
            Toggle sidebar
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>B</Kbd>
            </KbdGroup>
          </TooltipContent>
        </Tooltip>
      </div>
      <p className="text-body-sm text-muted-foreground">
        Press <Kbd>/</Kbd> to search, or{" "}
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>{" "}
        to open the command palette.
      </p>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Item
// ---------------------------------------------------------------------------

const REPORTS = [
  { id: "q3", title: "Q3 impressions by city", meta: "Ana Santos · edited 2 hours ago", status: "Live" },
  { id: "rail", title: "Rail network reach", meta: "Joris de Vries · edited yesterday", status: "Draft" },
  { id: "airport", title: "Airport screens audit", meta: "Mei Lin · edited 3 days ago", status: "Live" },
] as const

function ItemExample() {
  const [selected, setSelected] = React.useState<string>("rail")
  return (
    <Section title="Item">
      <Caption>Variants × sizes (static rows)</Caption>
      <div className="grid gap-4 md:grid-cols-3">
        {(["default", "outline", "muted"] as const).map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <Caption>variant={variant}</Caption>
            {(["default", "sm", "xs"] as const).map((size) => (
              <Item key={size} variant={variant} size={size}>
                <ItemMedia variant="icon">
                  <Icon name="bar-chart" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Size {size}</ItemTitle>
                  <ItemDescription>Weekly impressions report</ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </div>
        ))}
      </div>

      <Caption>A list of items with actions (outline rows in an ItemGroup)</Caption>
      <ItemGroup className="max-w-2xl">
        {REPORTS.map((r) => (
          <Item key={r.id} variant="outline">
            <ItemMedia variant="image">
              <Avatar size="lg" className="rounded-md after:rounded-md">
                <AvatarFallback className="rounded-md">
                  {r.meta.split(" ")[0]![0]}
                  {r.meta.split(" ")[1]![0]}
                </AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{r.title}</ItemTitle>
              <ItemDescription>{r.meta}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge variant={r.status === "Live" ? "success" : "secondary"}>{r.status}</Badge>
              <Button variant="outline" size="sm">
                Open
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label={`More actions for ${r.title}`}>
                <Icon name="more" />
              </Button>
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>

      <Caption>Interactive rows (rendered as links): hover, focus, data-selected, disabled</Caption>
      <ItemGroup className="max-w-md gap-0">
        {REPORTS.map((r, i) => (
          <React.Fragment key={r.id}>
            {i > 0 && <ItemSeparator />}
            <Item
              size="sm"
              render={<a href={`#${r.id}`} />}
              data-selected={selected === r.id ? "true" : undefined}
              aria-current={selected === r.id ? "page" : undefined}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                setSelected(r.id)
              }}
            >
              <ItemMedia variant="icon">
                <Icon name="chart-line" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{r.title}</ItemTitle>
                <ItemDescription>{r.meta}</ItemDescription>
              </ItemContent>
              <Icon name="chevron-right" className="size-4 text-muted-foreground" />
            </Item>
          </React.Fragment>
        ))}
        <ItemSeparator />
        <Item size="sm" render={<a href="#archived" />} aria-disabled="true" tabIndex={-1}>
          <ItemMedia variant="icon">
            <Icon name="folder" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Archived reports</ItemTitle>
            <ItemDescription>Disabled</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Hover Card
// ---------------------------------------------------------------------------

function HoverCardExample() {
  return (
    <Section title="Hover Card">
      <p className="text-body-sm text-foreground">
        Report shared by{" "}
        <HoverCard>
          <HoverCardTrigger
            href="#ana"
            className="font-semibold text-foreground underline underline-offset-4 outline-none focus-visible:rounded-sm focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring"
          >
            Ana Santos
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex gap-3">
              <Avatar size="lg">
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col gap-1">
                <p className="text-label font-semibold text-ink-heading">Ana Santos</p>
                <p className="text-caption text-muted-foreground">Media planner · Amsterdam</p>
                <p className="text-body-sm text-foreground">
                  Owns 12 campaigns across rail and airport screens.
                </p>
                <p className="flex items-center gap-1 text-caption text-muted-foreground">
                  <Icon name="calendar" className="size-3" />
                  Joined March 2023
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>{" "}
        on Monday. Hover or tab to the name.
      </p>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Scroll Area
// ---------------------------------------------------------------------------

const SCREENS = Array.from({ length: 30 }, (_, i) => ({
  id: `SCR-${String(1001 + i)}`,
  place: ["Amsterdam Centraal", "Schiphol Plaza", "Utrecht Centraal", "Rotterdam Blaak", "Den Haag HS"][i % 5]!,
}))

function ScrollAreaExample() {
  return (
    <Section title="Scroll Area">
      <div className="flex flex-wrap items-start gap-6">
        <Card className="w-72 gap-0 py-0">
          <CardHeader className="border-b-(length:--pl-border-width) border-border py-4">
            <CardTitle>Screens</CardTitle>
          </CardHeader>
          <ScrollArea className="h-72" aria-label="Screens">
            <ul className="flex flex-col p-2">
              {SCREENS.map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-body-sm">
                  <span className="text-foreground">{s.place}</span>
                  <span className="text-caption text-muted-foreground">{s.id}</span>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </Card>
        <Card className="w-full max-w-md gap-0 py-0">
          <CardContent className="p-0">
            <ScrollArea className="w-full rounded-lg" aria-label="Cities">
              <div className="flex w-max gap-3 p-4">
                {SCREENS.slice(0, 12).map((s) => (
                  <div key={s.id} className="flex w-36 shrink-0 flex-col gap-1 rounded-md border-(length:--pl-border-width) border-border p-3">
                    <span className="text-label font-semibold text-foreground">{s.id}</span>
                    <span className="text-caption text-muted-foreground">{s.place}</span>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Aspect Ratio
// ---------------------------------------------------------------------------

function AspectRatioExample() {
  return (
    <Section title="Aspect Ratio">
      <div className="flex flex-wrap items-start gap-4">
        {[
          { ratio: 16 / 9, label: "16:9 screen", width: "w-80" },
          { ratio: 9 / 16, label: "9:16 totem", width: "w-36" },
        ].map(({ ratio, label, width }) => (
          <AspectRatio key={label} ratio={ratio} className={`${width} rounded-lg bg-muted`}>
            <div className="flex size-full items-center justify-center gap-2 text-caption text-muted-foreground">
              <Icon name="tv" className="size-4" />
              {label}
            </div>
          </AspectRatio>
        ))}
      </div>
    </Section>
  )
}

export function DisplaySection() {
  return (
    <>
      <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">
        Display
      </p>
      <EmptyExample />
      <KbdExample />
      <ItemExample />
      <HoverCardExample />
      <ScrollAreaExample />
      <AspectRatioExample />
    </>
  )
}
