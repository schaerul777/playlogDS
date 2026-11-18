import * as React from "react"

import { Icon, type IconName } from "@workspace/ui/icons/icon"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb"
import { Button } from "@workspace/ui/components/button"
import { Kbd, KbdGroup } from "@workspace/ui/components/kbd"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
  type CommandItemData,
} from "@workspace/ui/components/command"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@workspace/ui/components/context-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@workspace/ui/components/menubar"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@workspace/ui/components/navigation-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationStatus,
} from "@workspace/ui/components/pagination"
import { toast } from "@workspace/ui/components/sonner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-h3 font-bold text-ink-heading">{title}</h2>
      {children}
    </section>
  )
}

// ---------------------------------------------------------------------------
// Page header with breadcrumb
// ---------------------------------------------------------------------------

function PageHeaderExample() {
  return (
    <Section title="Breadcrumb">
      <header className="flex flex-col gap-2 rounded-lg border-(length:--pl-border-width) border-border bg-card px-6 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  aria-label="Show hidden levels"
                  className="rounded-sm outline-none focus-visible:outline-(length:--pl-focus-ring-width) focus-visible:outline-offset-(--pl-focus-ring-offset) focus-visible:outline-solid focus-visible:outline-ring"
                >
                  <BreadcrumbEllipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Workspace</DropdownMenuItem>
                  <DropdownMenuItem>Reports</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Roadside</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Q3 roadside reach</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-h2 font-bold text-ink-heading">Q3 roadside reach</h1>
          <Button variant="outline">
            <Icon name="download" data-icon="inline-start" />
            Export
          </Button>
        </div>
      </header>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Reports</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cities</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Data table with pagination
// ---------------------------------------------------------------------------

const CITIES = [
  "Jakarta", "Surabaya", "Bandung", "Medan", "Semarang", "Makassar", "Palembang", "Tangerang",
  "Depok", "Bekasi", "Bogor", "Batam", "Pekanbaru", "Padang", "Malang", "Denpasar",
  "Yogyakarta", "Samarinda", "Balikpapan", "Pontianak", "Manado", "Banjarmasin", "Kupang", "Ambon",
]
const PAGE_SIZE = 4

function pageList(page: number, count: number): (number | "…")[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1)
  if (page <= 3) return [1, 2, 3, 4, "…", count]
  if (page >= count - 2) return [1, "…", count - 3, count - 2, count - 1, count]
  return [1, "…", page - 1, page, page + 1, "…", count]
}

function TablePager({
  page,
  count,
  onPage,
  size,
}: {
  page: number
  count: number
  onPage: (p: number) => void
  size: "default" | "sm"
}) {
  const go = (p: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    if (p >= 1 && p <= count) onPage(p)
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            size={size}
            onClick={go(page - 1)}
            aria-disabled={page === 1 || undefined}
            className="aria-disabled:pointer-events-none aria-disabled:opacity-(--pl-opacity-disabled)"
          />
        </PaginationItem>
        {pageList(page, count).map((p, i) =>
          p === "…" ? (
            <PaginationItem key={`e${i}`} className="max-sm:hidden">
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p} className="max-sm:hidden">
              <PaginationLink
                href="#"
                size={size === "sm" ? "icon-sm" : "icon"}
                isActive={p === page}
                onClick={go(p)}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationStatus page={page} pageCount={count} />
        <PaginationItem>
          <PaginationNext
            href="#"
            size={size}
            onClick={go(page + 1)}
            aria-disabled={page === count || undefined}
            className="aria-disabled:pointer-events-none aria-disabled:opacity-(--pl-opacity-disabled)"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

function PaginationExample() {
  const [page, setPage] = React.useState(1)
  const [page2, setPage2] = React.useState(6)
  const count = Math.ceil(CITIES.length / PAGE_SIZE)
  const rows = CITIES.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  return (
    <Section title="Pagination">
      <div className="flex flex-col gap-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>City</TableHead>
              <TableHead numeric>Impressions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((c, i) => (
              <TableRow key={c}>
                <TableCell>{c}</TableCell>
                <TableCell numeric>{(1_240_000 - ((page - 1) * PAGE_SIZE + i) * 37_500).toLocaleString("id-ID")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-caption font-medium text-muted-foreground tabular-nums">
            {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, CITIES.length)} of {CITIES.length} cities
          </span>
          <div>
            <TablePager page={page} count={count} onPage={setPage} size="sm" />
          </div>
        </div>
      </div>
      <TablePager page={page2} count={12} onPage={setPage2} size="default" />
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Accordion and Collapsible
// ---------------------------------------------------------------------------

const FAQ = [
  ["How is reach calculated?", "Reach is the share of a city's adult population that passed at least one screen in the period, modelled from the mobility panel."],
  ["Which cities are included?", "25 cities across Java, Sumatra, Bali and Sulawesi. Coverage is listed per report."],
  ["How often is the data updated?", "Monthly, on the fifth working day."],
]

function AccordionExample() {
  return (
    <Section title="Accordion and Collapsible">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="mb-2 text-caption font-medium text-muted-foreground">FAQ (single)</p>
          <Accordion defaultValue={["How is reach calculated?"]}>
            {FAQ.map(([q, a]) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>
                  <p>{a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
            <AccordionItem value="disabled" disabled>
              <AccordionTrigger>Can I export raw panel data? (disabled)</AccordionTrigger>
              <AccordionContent>Not available.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <p className="mb-2 text-caption font-medium text-muted-foreground">Multiple</p>
            <Accordion multiple>
              <AccordionItem value="a">
                <AccordionTrigger>Methodology</AccordionTrigger>
                <AccordionContent>Mobility panel, weighted to census.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="b">
                <AccordionTrigger>Sources</AccordionTrigger>
                <AccordionContent>Playlog screens, operator logs.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <Collapsible className="flex flex-col gap-2">
            <CollapsibleTrigger render={<Button variant="ghost" size="sm" className="self-start" />}>
              <Icon name="chevron-down" data-icon="inline-start" className="transition-transform duration-(--pl-duration-fast) in-aria-expanded:rotate-180" />
              Show filters
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className="rounded-md bg-muted px-4 py-3 text-body-sm text-muted-foreground">
                Period: Q3 2025 · Cities: 25 · Audience: adults 18+
              </p>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Command palette (Cmd/Ctrl+K)
// ---------------------------------------------------------------------------

type Cmd = CommandItemData & { icon: IconName; shortcut?: string }

const COMMANDS: { value: string; items: Cmd[] }[] = [
  {
    value: "Reports",
    items: [
      { value: "new", label: "New report", icon: "plus", shortcut: "⌘N" },
      { value: "open", label: "Open report", icon: "folder", shortcut: "⌘O" },
      { value: "export", label: "Export CSV", icon: "download", shortcut: "⌘E", keywords: ["download", "csv"] },
    ],
  },
  {
    value: "Go to",
    items: [
      { value: "dashboard", label: "Dashboard", icon: "home" },
      { value: "cities", label: "Cities", icon: "location" },
      { value: "settings", label: "Settings", icon: "settings", shortcut: "⌘," },
      { value: "archive", label: "Archive (disabled)", icon: "save", disabled: true },
    ],
  },
]

function CommandBody({ onSelect }: { onSelect: (c: Cmd) => void }) {
  return (
    <Command items={COMMANDS} onSelect={onSelect}>
      <CommandInput placeholder="Search commands" />
      <CommandEmpty>No results</CommandEmpty>
      <CommandList>
        {(group: { value: string; items: Cmd[] }) => (
          <CommandGroup key={group.value} items={group.items} heading={group.value}>
            <CommandCollection>
              {(item: Cmd) => (
                <CommandItem key={item.value} value={item} disabled={item.disabled}>
                  <Icon name={item.icon} />
                  {item.label}
                  {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
                </CommandItem>
              )}
            </CommandCollection>
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  )
}

function CommandExample() {
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // The showcase renders twice side by side; the first listener handles the key.
      if (e.defaultPrevented) return
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])
  const run = (c: Cmd) => {
    setOpen(false)
    toast(`${c.label}`)
  }
  return (
    <Section title="Command">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" onClick={() => setOpen(true)}>
          <Icon name="search" data-icon="inline-start" />
          Search commands
          <KbdGroup className="ml-2">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </Button>
      </div>
      <div className="max-w-md">
        <CommandBody onSelect={(c) => toast(c.label)} />
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandBody onSelect={run} />
      </CommandDialog>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Context Menu, Menubar, Navigation Menu
// ---------------------------------------------------------------------------

function MenusExample() {
  const [legend, setLegend] = React.useState(true)
  const [chart, setChart] = React.useState("bar")
  const [grid, setGrid] = React.useState(true)
  const [period, setPeriod] = React.useState("quarter")
  return (
    <>
      <Section title="Context Menu">
        <ContextMenu>
          <ContextMenuTrigger className="flex h-36 items-center justify-center rounded-lg border-(length:--pl-border-width) border-dashed border-input text-body-sm text-muted-foreground">
            Right-click the chart area
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuGroup>
              <ContextMenuLabel>Chart</ContextMenuLabel>
              <ContextMenuItem>
                <Icon name="download" />
                Download PNG
                <ContextMenuShortcut>⌘S</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSub>
              <ContextMenuSubTrigger>
                <Icon name="chart-line" />
                Chart type
              </ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuRadioGroup value={chart} onValueChange={setChart}>
                  <ContextMenuRadioItem value="bar">Bar</ContextMenuRadioItem>
                  <ContextMenuRadioItem value="line">Line</ContextMenuRadioItem>
                </ContextMenuRadioGroup>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuCheckboxItem checked={legend} onCheckedChange={setLegend}>
              Show legend
            </ContextMenuCheckboxItem>
            <ContextMenuItem disabled>
              <Icon name="edit" />
              Annotate (disabled)
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive">
              <Icon name="trash" />
              Remove chart
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Section>

      <Section title="Menubar">
        <Menubar className="w-fit">
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New report <MenubarShortcut>⌘N</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Open <MenubarShortcut>⌘O</MenubarShortcut>
              </MenubarItem>
              <MenubarSub>
                <MenubarSubTrigger>Share</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Planning team</MenubarItem>
                  <MenubarItem>Copy link</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem variant="destructive">Delete report</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem checked={grid} onCheckedChange={setGrid}>
                Gridlines
              </MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarRadioGroup value={period} onValueChange={setPeriod}>
                <MenubarRadioItem value="month">Month</MenubarRadioItem>
                <MenubarRadioItem value="quarter">Quarter</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu disabled>
            <MenubarTrigger>Admin</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Users</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Section>

      <Section title="Navigation Menu">
        <p className="text-caption font-medium text-muted-foreground md:hidden">
          Hidden below md: small screens use the Sidebar.
        </p>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Reports</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-96 grid-cols-2 gap-1">
                  {[
                    ["Reach", "Share of adults who saw the campaign."],
                    ["Frequency", "Average exposures per person."],
                    ["Impressions", "Total exposures by city."],
                    ["Audience", "Who passed the screens."],
                  ].map(([t, d]) => (
                    <li key={t}>
                      <NavigationMenuLink href="#">
                        <span className="font-semibold text-ink-heading">{t}</span>
                        <span className="text-caption text-muted-foreground">{d}</span>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Cities</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex w-56 flex-col gap-1">
                  {["Jakarta", "Surabaya", "Bandung"].map((c) => (
                    <li key={c}>
                      <NavigationMenuLink href="#">{c}</NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#" active className={navigationMenuTriggerStyle()}>
                Dashboard
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </Section>
    </>
  )
}

export function NavSection() {
  return (
    <>
      <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">
        Navigation
      </p>
      <PageHeaderExample />
      <PaginationExample />
      <AccordionExample />
      <CommandExample />
      <MenusExample />
    </>
  )
}
