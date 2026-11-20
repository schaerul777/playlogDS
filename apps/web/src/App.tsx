import * as React from "react"

import { Icon, type IconName } from "@workspace/ui/icons/icon"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert"
import { Badge } from "@workspace/ui/components/badge"
import { BarChart } from "@workspace/ui/components/bar-chart"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"
import { StatCard } from "@workspace/ui/components/stat-card"
import { Switch } from "@workspace/ui/components/switch"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import { Separator } from "@workspace/ui/components/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { Toaster, toast } from "@workspace/ui/components/sonner"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { cn } from "@workspace/ui/lib/utils"
import { FormsSection } from "@/forms-section"
import { NavSection } from "@/nav-section"
import { DisplaySection } from "@/display-section"
import { ChatSection } from "@/chat-section"
import { AgentSection } from "@/agent-section"
import { ChartsSection } from "@/charts-section"
import { ControlsSection } from "@/controls-section"
import { DateSection } from "@/date-section"

import { useTheme } from "@/components/theme-provider"

type View = "both" | "light" | "dark"

const BUTTON_VARIANTS = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const
const BUTTON_SIZES = ["xs", "sm", "default", "lg"] as const
const ICON_SIZES = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const
const BADGE_VARIANTS = [
  "default",
  "secondary",
  "destructive",
  "info",
  "success",
  "warning",
  "accent",
  "outline",
  "ghost",
  "link",
] as const

export function App() {
  const { setTheme } = useTheme()
  const [view, setView] = React.useState<View>("both")

  // "Side by side" keeps the page light and renders a forced-dark column next to it.
  React.useEffect(() => {
    setTheme(view === "dark" ? "dark" : "light")
  }, [view, setTheme])

  function choose(next: View) {
    setView(next)
  }

  return (
    <TooltipProvider>
    <div className="min-h-svh bg-background text-foreground">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-4">
        <div>
          <h1 className="text-h2 font-bold text-ink-heading">Playground</h1>
          <p className="text-body-sm text-muted-foreground">
            Every component, variant and state. Hover and press Tab to check
            hover and focus.
          </p>
        </div>
        <div
          role="group"
          aria-label="Theme"
          className="flex gap-1 rounded-md border border-border p-1"
        >
          {(["both", "light", "dark"] as const).map((v) => (
            <Button
              key={v}
              size="sm"
              variant="ghost"
              aria-pressed={view === v}
              onClick={() => choose(v)}
            >
              {v === "both" ? "Side by side" : v === "light" ? "Light" : "Dark"}
            </Button>
          ))}
        </div>
      </header>

      <div
        className={cn(
          "grid",
          view === "both" ? "xl:grid-cols-2" : "grid-cols-1"
        )}
      >
        <Showcase label={view === "dark" ? "Dark" : "Light"} />
        {view === "both" && <Showcase label="Dark" className="dark" />}
      </div>
      <Toaster />
    </div>
    </TooltipProvider>
  )
}

function Showcase({ label, className }: { label: string; className?: string }) {
  return (
    <main
      className={cn(
        "flex min-w-0 flex-col gap-10 bg-background p-6 text-foreground",
        className
      )}
    >
      <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <ButtonSection />
      <InputSection />
      <BadgeSection />
      <CheckboxSection />
      <SwitchSection />
      <SelectSection />
      <TabsSection />
      <AlertSection />
      <StatCardSection />
      <TableSection />
      <BarChartSection />
      <SidebarSection />
      <CardSection />
      <OverlaysNote />
      <DialogSection />
      <AlertDialogSection />
      <SheetSection />
      <DropdownMenuSection />
      <PopoverSection />
      <TooltipSection />
      <ToastSection />
      <SeparatorSection />
      <SkeletonSection />
      <FormsSection />
      <NavSection />
      <DisplaySection />
      <ChatSection />
      <AgentSection />
      <ChartsSection />
      <ControlsSection />
      <DateSection />
    </main>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-h3 font-bold text-ink-heading">{title}</h2>
      {children}
    </section>
  )
}

function RowLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-24 shrink-0 text-caption font-medium text-muted-foreground">
      {children}
    </span>
  )
}

function ButtonSection() {
  return (
    <Section title="Button">
      <div className="flex flex-col gap-3 overflow-x-auto">
        {BUTTON_VARIANTS.map((variant) => (
          <div key={variant} className="flex items-center gap-3">
            <RowLabel>{variant}</RowLabel>
            {BUTTON_SIZES.map((size) => (
              <Button key={size} variant={variant} size={size}>
                {size === "default" ? "Button" : size}
              </Button>
            ))}
            <Button variant={variant}>
              <Icon name="download" data-icon="inline-start" />
              Export
            </Button>
            <Button variant={variant} aria-pressed>
              Selected
            </Button>
            <Button variant={variant} disabled>
              Disabled
            </Button>
          </div>
        ))}
        <div className="flex items-center gap-3">
          <RowLabel>icon sizes</RowLabel>
          {ICON_SIZES.map((size) => (
            <Button key={size} variant="outline" size={size} aria-label="More">
              <Icon name="more" />
            </Button>
          ))}
          <Button size="icon" aria-label="Add">
            <Icon name="plus" />
          </Button>
          <Button size="icon" variant="destructive" aria-label="Delete">
            <Icon name="trash" />
          </Button>
          <Button size="icon" variant="ghost" aria-label="Search" disabled>
            <Icon name="search" />
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <RowLabel>trailing icon</RowLabel>
          <Button>
            View report
            <Icon name="chevron-right" data-icon="inline-end" />
          </Button>
          <Button size="sm" variant="secondary">
            View report
            <Icon name="chevron-right" data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </Section>
  )
}

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-label font-semibold">
        {label}
      </label>
      {children}
      {hint && (
        <p
          id={`${id}-hint`}
          className="text-caption font-medium text-muted-foreground"
        >
          {hint}
        </p>
      )}
    </div>
  )
}

function InputSection() {
  const id = React.useId()
  return (
    <Section title="Input">
      <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
        <Field id={`${id}-empty`} label="Empty">
          <Input id={`${id}-empty`} placeholder="Search campaigns" />
        </Field>
        <Field id={`${id}-filled`} label="Filled">
          <Input id={`${id}-filled`} defaultValue="Jakarta Selatan" />
        </Field>
        <Field id={`${id}-disabled`} label="Disabled">
          <Input id={`${id}-disabled`} defaultValue="Read only" disabled />
        </Field>
        <Field
          id={`${id}-invalid`}
          label="Invalid"
          hint="Enter a budget above Rp 1 M."
        >
          <Input
            id={`${id}-invalid`}
            defaultValue="Rp 0"
            aria-invalid
            aria-describedby={`${id}-invalid-hint`}
          />
        </Field>
        <Field id={`${id}-file`} label="File">
          <Input id={`${id}-file`} type="file" />
        </Field>
        <Field id={`${id}-num`} label="Number">
          <Input id={`${id}-num`} type="number" defaultValue={1284} />
        </Field>
      </div>
    </Section>
  )
}

function BadgeSection() {
  return (
    <Section title="Badge">
      <div className="flex flex-wrap items-center gap-3">
        <RowLabel>span</RowLabel>
        {BADGE_VARIANTS.map((variant) => (
          <Badge key={variant} variant={variant}>
            {variant}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <RowLabel>link (hover)</RowLabel>
        {BADGE_VARIANTS.map((variant) => (
          <Badge key={variant} variant={variant} render={<a href="#badge" />}>
            {variant}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <RowLabel>with icon</RowLabel>
        <Badge variant="secondary">
          <Icon name="plus" data-icon="inline-start" />
          New
        </Badge>
        <Badge variant="destructive">
          <Icon name="trash" data-icon="inline-start" />
          Removed
        </Badge>
      </div>
    </Section>
  )
}

function CardSection() {
  return (
    <Section title="Card">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Impressions</CardTitle>
            <CardDescription>Q1–Q3 2025 · 25 cities</CardDescription>
            <CardAction>
              <Badge variant="secondary">Roadside</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-kpi font-extrabold text-ink-heading tabular-nums">
              12,4 M
            </p>
            <p className="text-caption font-medium text-muted-foreground">
              Source: Playlog audience panel
            </p>
          </CardContent>
          <CardFooter className="gap-2 border-t border-border">
            <Button size="sm">View report</Button>
            <Button size="sm" variant="ghost">
              Dismiss
            </Button>
          </CardFooter>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Small card</CardTitle>
            <CardDescription>16px padding for dense panels.</CardDescription>
          </CardHeader>
          <CardContent>
            <Input placeholder="Filter screens" aria-label="Filter screens" />
          </CardContent>
          <CardFooter>
            <Button size="sm" variant="outline">
              Apply
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Section>
  )
}

function ChoiceLabel({ children }: { children: React.ReactNode }) {
  return (
    // Spec: 10px gap to the label; the checkbox box sits 1px below the label's first line.
    <label className="flex items-start gap-2.5 text-body-sm text-foreground [&>[data-slot=checkbox]]:mt-px">
      {children}
    </label>
  )
}

function CheckboxSection() {
  return (
    <Section title="Checkbox">
      <div className="flex flex-wrap items-center gap-6">
        <ChoiceLabel>
          <Checkbox /> Unchecked
        </ChoiceLabel>
        <ChoiceLabel>
          <Checkbox defaultChecked /> Checked
        </ChoiceLabel>
        <ChoiceLabel>
          <Checkbox disabled /> Disabled
        </ChoiceLabel>
        <ChoiceLabel>
          <Checkbox disabled defaultChecked /> Disabled checked
        </ChoiceLabel>
        <ChoiceLabel>
          <Checkbox aria-invalid /> Invalid
        </ChoiceLabel>
        <ChoiceLabel>
          <Checkbox aria-invalid defaultChecked /> Invalid checked
        </ChoiceLabel>
      </div>
    </Section>
  )
}

function SwitchSection() {
  return (
    <Section title="Switch">
      {(["default", "sm"] as const).map((size) => (
        <div key={size} className="flex flex-wrap items-center gap-6">
          <RowLabel>size={size}</RowLabel>
          <ChoiceLabel>
            <Switch size={size} /> Off
          </ChoiceLabel>
          <ChoiceLabel>
            <Switch size={size} defaultChecked /> On
          </ChoiceLabel>
          <ChoiceLabel>
            <Switch size={size} disabled /> Disabled
          </ChoiceLabel>
          <ChoiceLabel>
            <Switch size={size} disabled defaultChecked /> Disabled on
          </ChoiceLabel>
          <ChoiceLabel>
            <Switch size={size} aria-invalid /> Invalid
          </ChoiceLabel>
        </div>
      ))}
    </Section>
  )
}

const CITIES = {
  jakarta: "Jakarta",
  bandung: "Bandung",
  surabaya: "Surabaya",
  medan: "Medan",
  makassar: "Makassar",
}

function CitySelect({
  size,
  defaultValue,
  disabled,
  invalid,
  label,
}: {
  size?: "default" | "sm"
  defaultValue?: keyof typeof CITIES
  disabled?: boolean
  invalid?: boolean
  label: string
}) {
  return (
    <Select items={CITIES} defaultValue={defaultValue} disabled={disabled}>
      <SelectTrigger
        size={size}
        aria-label={label}
        aria-invalid={invalid || undefined}
        className="w-48"
      >
        <SelectValue placeholder="Choose a city" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Java</SelectLabel>
          <SelectItem value="jakarta">Jakarta</SelectItem>
          <SelectItem value="bandung">Bandung</SelectItem>
          <SelectItem value="surabaya">Surabaya</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Outside Java</SelectLabel>
          <SelectItem value="medan">Medan</SelectItem>
          <SelectItem value="makassar" disabled>
            Makassar
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

function SelectSection() {
  return (
    <Section title="Select">
      <div className="flex flex-wrap items-start gap-4">
        <CitySelect label="Placeholder" />
        <CitySelect label="Selected" defaultValue="jakarta" />
        <CitySelect label="Small" size="sm" defaultValue="bandung" />
        <CitySelect label="Disabled" disabled defaultValue="surabaya" />
        <CitySelect label="Invalid" invalid />
      </div>
      <p className="text-caption font-medium text-muted-foreground">
        Open a select to see highlighted, selected and disabled items.
      </p>
    </Section>
  )
}

function TabsDemo({
  variant,
  orientation,
}: {
  variant: "default" | "line"
  orientation: "horizontal" | "vertical"
}) {
  return (
    <Tabs defaultValue="overview" orientation={orientation}>
      <TabsList variant={variant}>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="audience">
          <Icon name="bar-chart" data-icon="inline-start" />
          Audience
        </TabsTrigger>
        <TabsTrigger value="locations">
          <Icon name="location" data-icon="inline-start" />
          Locations
        </TabsTrigger>
        <TabsTrigger value="export" disabled>
          Export
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Impressions across 25 cities.</TabsContent>
      <TabsContent value="audience">Audience by age and gender.</TabsContent>
      <TabsContent value="locations">Screens by city.</TabsContent>
    </Tabs>
  )
}

function TabsSection() {
  return (
    <Section title="Tabs">
      <div className="grid gap-6 md:grid-cols-2">
        {(["default", "line"] as const).flatMap((variant) =>
          (["horizontal", "vertical"] as const).map((orientation) => (
            <div key={variant + orientation} className="flex flex-col gap-2">
              <span className="text-caption font-medium text-muted-foreground">
                variant={variant}, {orientation}
              </span>
              <TabsDemo variant={variant} orientation={orientation} />
            </div>
          ))
        )}
      </div>
    </Section>
  )
}

function AlertSection() {
  return (
    <Section title="Alert">
      <div className="grid max-w-2xl gap-3">
        <Alert>
          <AlertTitle>Report scheduled</AlertTitle>
          <AlertDescription>
            The Q3 2025 audience report is sent every Monday at 08:00.
          </AlertDescription>
        </Alert>
        <Alert variant="info">
          <Icon name="info" />
          <AlertTitle>New cities added</AlertTitle>
          <AlertDescription>
            Makassar and Medan now report impressions daily.
          </AlertDescription>
        </Alert>
        <Alert variant="success">
          <Icon name="check" />
          <AlertTitle>Campaign live</AlertTitle>
          <AlertDescription>
            128 roadside screens in Jakarta started on 1 October.
          </AlertDescription>
        </Alert>
        <Alert variant="warning">
          <Icon name="warning" />
          <AlertTitle>Data is 2 days behind</AlertTitle>
          <AlertDescription>
            Transit impressions for Surabaya will update by Thursday.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <Icon name="alert-circle" />
          <AlertTitle>Export failed</AlertTitle>
          <AlertDescription>
            The file was larger than 25 MB. Choose a shorter period.
          </AlertDescription>
          <AlertAction>
            <Button size="xs" variant="outline">
              Retry
            </Button>
          </AlertAction>
        </Alert>
        <Alert variant="info">
          <AlertTitle>Title only, no icon</AlertTitle>
        </Alert>
      </div>
    </Section>
  )
}

function StatCardSection() {
  return (
    <Section title="StatCard">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Media spend"
          icon={<Icon name="calculator" />}
          value="Rp 12,4 M"
          delta="+8,2%"
          trend="good"
          footer="Q1–Q3 2025 · 25 cities"
        />
        <StatCard
          label="Impressions"
          icon={<Icon name="eye" />}
          value="48,6 M"
          delta="−3,1%"
          trend="bad"
          footer="vs Q1–Q3 2024 · Playlog panel"
        />
        <StatCard
          label="Live screens"
          icon={<Icon name="tv" />}
          value="1.284"
          delta="0,0%"
          trend="neutral"
          footer="25 cities · 30 Sep 2025"
        />
        <StatCard
          label="Avg. frequency"
          value="3,2×"
          footer="Per reached person · Q3 2025"
        />
      </div>
    </Section>
  )
}

const CITY_ROWS = [
  {
    city: "Jakarta",
    line: "Roadside",
    screens: "1.284",
    impressions: "4,8 M",
    reach: "2,1 M",
    share: "38,7%",
  },
  {
    city: "Surabaya",
    line: "Transit",
    screens: "642",
    impressions: "2,3 M",
    reach: "1,0 M",
    share: "18,5%",
  },
  {
    city: "Bandung",
    line: "Place-based",
    screens: "518",
    impressions: "1,9 M",
    reach: "0,8 M",
    share: "15,3%",
  },
  {
    city: "Medan",
    line: "Roadside",
    screens: "377",
    impressions: "1,4 M",
    reach: "0,6 M",
    share: "11,3%",
  },
  {
    city: "Makassar",
    line: "Ambience",
    screens: "214",
    impressions: "0,8 M",
    reach: "0,4 M",
    share: "6,5%",
  },
]

function CityTable({
  dense,
  withExtras,
}: {
  dense?: boolean
  withExtras?: boolean
}) {
  return (
    <Table dense={dense}>
      {withExtras && (
        <TableCaption>
          Impressions by city · Q1–Q3 2025 · top 5 of 25 cities
        </TableCaption>
      )}
      <TableHeader>
        <TableRow>
          <TableHead>City</TableHead>
          <TableHead>Product line</TableHead>
          <TableHead numeric>Screens</TableHead>
          <TableHead numeric>Impressions</TableHead>
          <TableHead numeric>Reach</TableHead>
          <TableHead numeric>Share</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {CITY_ROWS.map((r, i) => (
          <TableRow
            key={r.city}
            data-state={withExtras && i === 1 ? "selected" : undefined}
          >
            <TableCell>{r.city}</TableCell>
            <TableCell>{r.line}</TableCell>
            <TableCell numeric>{r.screens}</TableCell>
            <TableCell numeric>{r.impressions}</TableCell>
            <TableCell numeric>{r.reach}</TableCell>
            <TableCell numeric>{r.share}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {withExtras && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Top 5 cities</TableCell>
            <TableCell numeric>3.035</TableCell>
            <TableCell numeric>11,2 M</TableCell>
            <TableCell numeric>4,9 M</TableCell>
            <TableCell numeric>90,3%</TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  )
}

function TableSection() {
  return (
    <Section title="DataTable">
      <div className="flex flex-col gap-2">
        <span className="text-caption font-medium text-muted-foreground">
          Default, with caption, selected row (Surabaya) and totals. Hover a
          row.
        </span>
        <CityTable withExtras />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-caption font-medium text-muted-foreground">
          dense
        </span>
        <CityTable dense />
      </div>
    </Section>
  )
}

// Indonesian number formatting (1.284, 12,4) for the sample data.
const idNumber = (v: number) =>
  v.toLocaleString("id-ID", { maximumFractionDigits: 1 })

const IMPRESSIONS_BY_CITY = [
  { city: "Jakarta", impressions: 4.8 },
  { city: "Surabaya", impressions: 2.3 },
  { city: "Bandung", impressions: 1.9 },
  { city: "Medan", impressions: 1.4 },
  { city: "Makassar", impressions: 0.8 },
]

const IMPRESSIONS_BY_QUARTER = [
  { quarter: "Q1", y2024: 13.9, y2025: 15.2 },
  { quarter: "Q2", y2024: 15.1, y2025: 16.8 },
  { quarter: "Q3", y2024: 16.4, y2025: 16.6 },
]

const LINES_BY_CITY = [
  {
    city: "Jakarta",
    roadside: 2.6,
    transit: 1.1,
    placeBased: 0.7,
    ambience: 0.4,
  },
  {
    city: "Surabaya",
    roadside: 0.9,
    transit: 0.8,
    placeBased: 0.4,
    ambience: 0.2,
  },
  {
    city: "Bandung",
    roadside: 0.8,
    transit: 0.4,
    placeBased: 0.5,
    ambience: 0.2,
  },
  {
    city: "Medan",
    roadside: 0.7,
    transit: 0.3,
    placeBased: 0.3,
    ambience: 0.1,
  },
]

function ChartCard({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

function BarChartSection() {
  return (
    <Section title="BarChart">
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard
          title="Impressions by city"
          description="Millions · Q1–Q3 2025 · Playlog panel"
        >
          <BarChart
            className="aspect-auto h-64"
            data={IMPRESSIONS_BY_CITY}
            categoryKey="city"
            config={{ impressions: { label: "Impressions (M)" } }}
            valueFormatter={idNumber}
          />
        </ChartCard>
        <ChartCard
          title="Impressions by quarter"
          description="Millions · 2024 vs 2025 · 25 cities"
        >
          <BarChart
            className="aspect-auto h-64"
            data={IMPRESSIONS_BY_QUARTER}
            categoryKey="quarter"
            config={{
              y2024: { label: "2024" },
              y2025: { label: "2025" },
            }}
            valueFormatter={idNumber}
          />
        </ChartCard>
        <ChartCard
          title="Product lines by city"
          description="Millions of impressions · Q1–Q3 2025 · product-line colours"
        >
          <BarChart
            className="aspect-auto h-64"
            data={LINES_BY_CITY}
            categoryKey="city"
            layout="vertical"
            stacked
            config={{
              roadside: { label: "Roadside", color: "var(--pl-line-roadside)" },
              transit: { label: "Transit", color: "var(--pl-line-transit)" },
              placeBased: {
                label: "Place-based",
                color: "var(--pl-line-place-based)",
              },
              ambience: { label: "Ambience", color: "var(--pl-line-ambience)" },
            }}
            valueFormatter={idNumber}
          />
        </ChartCard>
      </div>
    </Section>
  )
}

const NAV = [
  {
    title: "Analytics",
    items: [
      { label: "Overview", icon: "gauge" as IconName, active: true },
      { label: "Audience", icon: "users" as IconName },
      { label: "Locations", icon: "location" as IconName, count: "25" },
      { label: "Reports", icon: "presentation" as IconName, count: "3" },
    ],
  },
  {
    title: "Inventory",
    items: [
      { label: "Screens", icon: "tv" as IconName },
      { label: "Campaigns", icon: "rocket" as IconName, count: "12" },
      { label: "Product lines", icon: "package" as IconName },
    ],
  },
]

function DemoSidebar({ collapsible }: { collapsible: "offcanvas" | "icon" }) {
  return (
    <Sidebar collapsible={collapsible} className="h-full">
      <SidebarHeader>
        <span className="px-3 text-h3 font-bold text-ink-heading group-data-[collapsible=icon]:sr-only">
          Playlog
        </span>
      </SidebarHeader>
      <SidebarContent>
        {NAV.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      isActive={item.active}
                      tooltip={item.label}
                    >
                      <Icon name={item.icon} />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                    {item.count && (
                      <SidebarMenuBadge>{item.count}</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Icon name="settings" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Help" disabled>
              <Icon name="book" />
              <span>Help (disabled)</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function SidebarDemo({
  label,
  collapsible,
  defaultOpen,
}: {
  label: string
  collapsible: "offcanvas" | "icon"
  defaultOpen: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-caption font-medium text-muted-foreground">
        {label}
      </span>
      {/* transform-gpu gives the fixed sidebar a containing block inside the playground frame. */}
      <div className="h-140 transform-gpu overflow-hidden rounded-lg border border-border">
        <SidebarProvider defaultOpen={defaultOpen} className="h-full min-h-0">
          <DemoSidebar collapsible={collapsible} />
          <SidebarInset>
            <header className="flex items-center gap-2 border-b border-border px-4 py-3">
              <SidebarTrigger />
              <span className="text-label font-semibold text-ink-heading">
                Overview
              </span>
            </header>
            <div className="p-4 text-body-sm text-muted-foreground">
              Use the button to collapse and expand the sidebar.
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  )
}

function SidebarSection() {
  return (
    <Section title="Sidebar">
      <div className="grid gap-4 lg:grid-cols-2">
        <SidebarDemo
          label="Expanded (spec)"
          collapsible="offcanvas"
          defaultOpen
        />
        <SidebarDemo
          label="Collapsed to icons (collapsible=icon)"
          collapsible="icon"
          defaultOpen={false}
        />
      </div>
    </Section>
  )
}

// ---------------------------------------------------------------------------
// Overlays (Batch A)
// ---------------------------------------------------------------------------

function OverlaysNote() {
  return (
    <p className="text-caption font-medium text-muted-foreground">
      Overlays open in a portal on the page, so they follow the page theme. Use
      the Light or Dark view to check them in each theme.
    </p>
  )
}

function DialogSection() {
  const id = React.useId()
  return (
    <Section title="Dialog">
      <div className="flex flex-wrap gap-3">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>
            Edit report
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit report</DialogTitle>
              <DialogDescription>
                Rename the report and choose who can see it.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Field id={`${id}-name`} label="Report name">
                <Input id={`${id}-name`} defaultValue="Q3 roadside reach" />
              </Field>
              <Field id={`${id}-owner`} label="Owner" hint="Owners can edit and share.">
                <Input id={`${id}-owner`} defaultValue="Media planning" />
              </Field>
            </div>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
              <DialogClose render={<Button />}>Save changes</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>
            Without close button
          </DialogTrigger>
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Methodology</DialogTitle>
              <DialogDescription>
                Reach is modelled from mobility panels across 25 cities, Q1 to Q3 2025.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter showCloseButton />
          </DialogContent>
        </Dialog>
      </div>
    </Section>
  )
}

function AlertDialogSection() {
  return (
    <Section title="Alert Dialog">
      <div className="flex flex-wrap gap-3">
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline" />}>
            Default
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Publish this report?</AlertDialogTitle>
              <AlertDialogDescription>
                Everyone in the workspace will see it in their library.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Publish</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="destructive" />}>
            Destructive
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this report?</AlertDialogTitle>
              <AlertDialogDescription>
                The report and its 12 charts will be removed. This can't be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive">Delete report</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline" />}>
            With media
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogMedia>
                <Icon name="users" />
              </AlertDialogMedia>
              <AlertDialogTitle>Share with the planning team?</AlertDialogTitle>
              <AlertDialogDescription>
                14 people will get edit access.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Share</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline" />}>
            Size sm
          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Discard changes?</AlertDialogTitle>
              <AlertDialogDescription>Your edits will be lost.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep editing</AlertDialogCancel>
              <AlertDialogAction variant="destructive">Discard</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Section>
  )
}

const SHEET_SIDES = ["right", "left", "top", "bottom"] as const

function SheetSection() {
  return (
    <Section title="Sheet">
      <div className="flex flex-wrap gap-3">
        {SHEET_SIDES.map((side) => (
          <Sheet key={side}>
            <SheetTrigger render={<Button variant="outline" />}>
              {side[0].toUpperCase() + side.slice(1)}
            </SheetTrigger>
            <SheetContent side={side}>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Narrow the report by city and period.</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-3 px-6">
                <ChoiceLabel>
                  <Checkbox defaultChecked /> Jakarta
                </ChoiceLabel>
                <ChoiceLabel>
                  <Checkbox /> Surabaya
                </ChoiceLabel>
              </div>
              <SheetFooter>
                <SheetClose render={<Button variant="outline" />}>Reset</SheetClose>
                <SheetClose render={<Button />}>Apply filters</SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </Section>
  )
}

function DropdownMenuSection() {
  const [showGrid, setShowGrid] = React.useState(true)
  const [showLegend, setShowLegend] = React.useState(false)
  const [period, setPeriod] = React.useState("quarter")
  return (
    <Section title="Dropdown Menu">
      <div className="flex flex-wrap gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            Report actions
            <Icon name="chevron-down" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Report</DropdownMenuLabel>
              <DropdownMenuItem>
                <Icon name="edit" />
                Rename
                <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="download" />
                Export CSV
                <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Icon name="users" />
                  Share
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Planning team</DropdownMenuItem>
                  <DropdownMenuItem>Sales team</DropdownMenuItem>
                  <DropdownMenuItem>Copy link</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem disabled>
                <Icon name="settings" />
                Schedule (disabled)
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <Icon name="trash" />
              Delete report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            Chart options
            <Icon name="chevron-down" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Show</DropdownMenuLabel>
              <DropdownMenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
                Gridlines
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={showLegend} onCheckedChange={setShowLegend}>
                Legend
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Period</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={period} onValueChange={setPeriod}>
                <DropdownMenuRadioItem value="month">Month</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="quarter">Quarter</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="year">Year</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem inset>Reset view</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" size="icon" aria-label="More actions" />}
          >
            <Icon name="more" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem>Move to folder</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Section>
  )
}

function PopoverSection() {
  const id = React.useId()
  return (
    <Section title="Popover">
      <div className="flex flex-wrap gap-3">
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>Set target</PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Reach target</PopoverTitle>
              <PopoverDescription>Shown as a line on the chart.</PopoverDescription>
            </PopoverHeader>
            <Field id={`${id}-target`} label="Target (impressions)">
              <Input id={`${id}-target`} defaultValue="1.200.000" />
            </Field>
            <Button size="sm" className="self-end">
              Save target
            </Button>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>Text only</PopoverTrigger>
          <PopoverContent side="right">
            <PopoverHeader>
              <PopoverTitle>Source</PopoverTitle>
              <PopoverDescription>
                Mobility panel, Q1 to Q3 2025, 25 cities.
              </PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </div>
    </Section>
  )
}

const TOOLTIP_SIDES = ["top", "right", "bottom", "left"] as const

function TooltipSection() {
  return (
    <Section title="Tooltip">
      <div className="flex flex-wrap items-center gap-3">
        {TOOLTIP_SIDES.map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger render={<Button variant="outline" />}>
              {side[0].toUpperCase() + side.slice(1)}
            </TooltipTrigger>
            <TooltipContent side={side}>Impressions per 1,000 people</TooltipContent>
          </Tooltip>
        ))}
        <Tooltip>
          <TooltipTrigger
            render={<Button variant="ghost" size="icon" aria-label="Download" />}
          >
            <Icon name="download" />
          </TooltipTrigger>
          <TooltipContent>Download CSV</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>Long text</TooltipTrigger>
          <TooltipContent>
            Reach is the share of the city's adult population that saw the campaign
            at least once in the period.
          </TooltipContent>
        </Tooltip>
      </div>
    </Section>
  )
}

function ToastSection() {
  return (
    <Section title="Toast">
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={() => toast("Report saved")}>
          Default
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.success("Export ready", {
              description: "Q3 roadside reach.csv, 2,4 MB",
            })
          }
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.info("New data available", {
              description: "September figures for 25 cities.",
            })
          }
        >
          Info
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.warning("Partial data", {
              description: "Medan has no figures for August.",
            })
          }
        >
          Warning
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.error("Export failed", {
              description: "The file is too large. Narrow the period and try again.",
            })
          }
        >
          Error
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
              loading: "Exporting report",
              success: "Export ready",
              error: "Export failed",
            })
          }
        >
          Loading
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast("Report deleted", {
              description: "Q3 roadside reach",
              action: { label: "Undo", onClick: () => toast("Report restored") },
            })
          }
        >
          With action
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast("Filters applied", {
              description: "Jakarta, Surabaya · Q3 2025",
              closeButton: true,
            })
          }
        >
          With close button
        </Button>
      </div>
    </Section>
  )
}

function SeparatorSection() {
  return (
    <Section title="Separator">
      <div className="flex flex-col gap-3">
        <p className="text-body-sm">Above the line</p>
        <Separator />
        <div className="flex h-5 items-center gap-3 text-body-sm">
          <span>Reach</span>
          <Separator orientation="vertical" />
          <span>Frequency</span>
          <Separator orientation="vertical" />
          <span>Impressions</span>
        </div>
      </div>
    </Section>
  )
}

function SkeletonSection() {
  return (
    <Section title="Skeleton">
      <div aria-busy="true" className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-(--pl-radius-full)" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>
    </Section>
  )
}
