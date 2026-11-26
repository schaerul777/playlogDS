// React side of the pilot comparison. Keep the markup, classes and data-specimen ids identical to
// apps/web-vue/src/sections/*.vue so the two pages can be compared element by element.
import * as React from "react"
import { createRoot } from "react-dom/client"

import { Button } from "@workspace/ui/components/button"
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
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group"
import { Switch } from "@workspace/ui/components/switch"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@workspace/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@workspace/ui/components/native-select"
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
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@workspace/ui/components/combobox"
import { Slider, SliderLabel, SliderValue } from "@workspace/ui/components/slider"
import { Toggle } from "@workspace/ui/components/toggle"
import { ToggleGroup, ToggleGroupItem } from "@workspace/ui/components/toggle-group"
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
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@workspace/ui/components/popover"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@workspace/ui/components/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@workspace/ui/components/tooltip"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@workspace/ui/components/context-menu"
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
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@workspace/ui/components/hover-card"
import { Toaster, toast } from "@workspace/ui/components/sonner"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
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
} from "@workspace/ui/components/command"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
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
import { Textarea } from "@workspace/ui/components/textarea"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@workspace/ui/components/input-otp"
import { AspectRatio } from "@workspace/ui/components/aspect-ratio"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@workspace/ui/components/button-group"
import { Kbd, KbdGroup } from "@workspace/ui/components/kbd"
import { ScrollArea, ScrollBar } from "@workspace/ui/components/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@workspace/ui/components/accordion"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/collapsible"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@workspace/ui/components/empty"
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemHeader, ItemMedia, ItemSeparator, ItemTitle } from "@workspace/ui/components/item"
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@workspace/ui/components/avatar"
import { Progress, ProgressLabel, ProgressValue } from "@workspace/ui/components/progress"
import { Spinner } from "@workspace/ui/components/spinner"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@workspace/ui/components/alert"
import { Badge } from "@workspace/ui/components/badge"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { StatCard } from "@workspace/ui/components/stat-card"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import { id as idLocale } from "react-day-picker/locale"
import { Calendar } from "@workspace/ui/components/calendar"
import { DatePicker, DateRangePicker, getDefaultDateRangePresets, type DateRange } from "@workspace/ui/components/date-picker"
import { AreaChart } from "@workspace/ui/components/area-chart"
import { BarChart } from "@workspace/ui/components/bar-chart"
import { LineChart } from "@workspace/ui/components/line-chart"
import { PieChart } from "@workspace/ui/components/pie-chart"
import { ChartPanel, type ChartPanelColumn } from "@workspace/ui/components/chart-panel"
import { idCompact, idNumber, idRupiah } from "@workspace/ui/lib/chart-format"
import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentGroup, AttachmentMedia, AttachmentTitle, AttachmentTrigger } from "@workspace/ui/components/attachment"
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@workspace/ui/components/bubble"
import { Marker, MarkerContent, MarkerIcon } from "@workspace/ui/components/marker"
import { Message, MessageContent, MessageFooter, MessageHeader } from "@workspace/ui/components/message"
import { Trace, TraceCollapsible, TraceCollapsibleContent, TraceCollapsibleTrigger, TraceDescription, TraceLine, TraceStatusIcon, TraceTitle } from "@workspace/ui/components/trace"
import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerItem, MessageScrollerProvider, MessageScrollerViewport } from "@workspace/ui/components/message-scroller"
import { AssistantMessage, AssistantMessageActions, UserMessage, UserMessageActions } from "@workspace/ui/components/ai-elements/message"
import { Chat, ChatEmpty, ChatFooter, ChatHeader, ChatThread, ChatTurn } from "@workspace/ui/components/ai-elements/chat"
import { ChainOfThought, ChainOfThoughtBadges, ChainOfThoughtStep } from "@workspace/ui/components/ai-elements/chain-of-thought"
import { Checkpoint } from "@workspace/ui/components/ai-elements/checkpoint"
import { Context } from "@workspace/ui/components/ai-elements/context"
import { ModelSelector, type ModelProvider } from "@workspace/ui/components/ai-elements/model-selector"
import { Plan, type PlanStep } from "@workspace/ui/components/ai-elements/plan"
import { Queue, type QueueTodo } from "@workspace/ui/components/ai-elements/queue"
import { Subagent } from "@workspace/ui/components/ai-elements/subagent"
import { Tool } from "@workspace/ui/components/ai-elements/tool"
import { CodeBlock, CodeBlockActions, CodeBlockContent, CodeBlockCopyButton, CodeBlockFooter, CodeBlockHeader, CodeBlockLine, CodeBlockTitle } from "@workspace/ui/components/code-block"
import { useHighlightedCode } from "@workspace/ui/hooks/use-highlighted-code"
import { Task, TaskStep } from "@workspace/ui/components/ai-elements/task"
import { Confirmation } from "@workspace/ui/components/ai-elements/confirmation"
import { InlineCitation } from "@workspace/ui/components/ai-elements/inline-citation"
import { PromptInput } from "@workspace/ui/components/ai-elements/prompt-input"
import { Reasoning } from "@workspace/ui/components/ai-elements/reasoning"
import { Sources } from "@workspace/ui/components/ai-elements/sources"
import { Suggestion, Suggestions } from "@workspace/ui/components/ai-elements/suggestion"
import { Icon } from "@workspace/ui/icons/icon"
import "./styles.css"

const variants = ["default", "outline", "secondary", "ghost", "destructive", "link"] as const
const sizes = ["xs", "sm", "default", "lg"] as const
const iconSizes = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const

// Charts (Batch 16, step 1): the same data as apps/web-vue ChartsSection. Static example data, no network.
const CH_WEEKS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"]
const CH_STARTED = [310, 342, 365, 351, 398, 412, 405, 440, 462, 451, 489, 503]
const CH_COMPLETED = [248, 270, 301, 289, 322, 341, 338, 372, 391, 380, 418, 433]
const CH_SURVEYS_PER_WEEK = CH_WEEKS.slice(-6).map((week, i) => ({ week, completions: CH_COMPLETED.slice(-6)[i]! }))
const CH_SURVEY_TREND = CH_WEEKS.map((week, i) => ({ week, started: CH_STARTED[i]!, completed: CH_COMPLETED[i]! }))
const CH_WEEK_COLUMNS: ChartPanelColumn[] = [
  { key: "week", label: "Week" },
  { key: "completions", label: "Completions", format: idNumber },
]
const CH_TREND_COLUMNS: ChartPanelColumn[] = [
  { key: "week", label: "Week" },
  { key: "started", label: "Started", format: idNumber },
  { key: "completed", label: "Completed", format: idNumber },
]

const CH_CITIES = [
  { city: "Jakarta", roadside: 4800, urban: 3100 },
  { city: "Bandung", roadside: 3200, urban: 2500 },
  { city: "Surabaya", roadside: 2900, urban: 1800 },
  { city: "Medan", roadside: 2100, urban: 1500 },
]
const CH_CITY_CONFIG = { roadside: { label: "Roadside" }, urban: { label: "Urban" } }
const CH_CITY_COLUMNS: ChartPanelColumn[] = [
  { key: "city", label: "City" },
  { key: "roadside", label: "Roadside", format: idNumber },
  { key: "urban", label: "Urban", format: idNumber },
]

const CH_REVENUE = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"].map((month, i) => ({
  month,
  revenue: [182_000_000, 205_500_000, 198_250_000, 231_000_000, 247_800_000, 262_400_000][i]!,
}))
const CH_BY_CHANNEL = CH_WEEKS.slice(-8).map((week, i) => ({
  week,
  panel: [150, 160, 158, 171, 180, 177, 190, 198][i]!,
  streetIntercept: [60, 64, 70, 66, 75, 78, 80, 83][i]!,
  qr: [38, 48, 50, 63, 65, 83, 100, 152][i]!,
}))
const CH_BILLBOARD_STATUS = [
  { name: "Active", value: 612 },
  { name: "Scheduled", value: 141 },
  { name: "Maintenance", value: 88 },
  { name: "Offline", value: 47 },
  { name: "Draft", value: 31 },
  { name: "Pending approval", value: 18 },
  { name: "Archived", value: 9 },
]
const CH_CITY_SHARE = [
  { name: "Jakarta", value: 4.8 },
  { name: "Surabaya", value: 2.8 },
  { name: "Bandung", value: 2.3 },
  { name: "Medan", value: 1.9 },
]
const CH_REVENUE_COLUMNS: ChartPanelColumn[] = [
  { key: "month", label: "Month" },
  { key: "revenue", label: "Revenue", format: idRupiah },
]
const CH_CHANNEL_COLUMNS: ChartPanelColumn[] = [
  { key: "week", label: "Week" },
  { key: "panel", label: "Panel", format: idNumber },
  { key: "streetIntercept", label: "Street intercept", format: idNumber },
  { key: "qr", label: "QR code", format: idNumber },
]

function ChartsSection() {
  const [retries, setRetries] = React.useState(0)
  return (
    <>
      <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">Charts</p>
      <section className="flex flex-col gap-4">
        <h2 className="text-h3 font-bold text-ink-heading">Bar</h2>
        <p className="text-caption text-muted-foreground">
          The Bar chart with a 2px corner radius on the data end, 4px between bars and 16% between categories.
        </p>
        <div className="grid gap-4 lg:grid-cols-2">
          <div data-specimen="bar-single">
            <ChartPanel
              title="Survey completions per week"
              description="Completed surveys · last 6 weeks"
              summary="Completions rose from 341 in week 7 to 433 in week 12."
              columns={CH_WEEK_COLUMNS}
              rows={CH_SURVEYS_PER_WEEK}
            >
              <BarChart
                className="aspect-auto h-64"
                data={CH_SURVEYS_PER_WEEK}
                categoryKey="week"
                config={{ completions: { label: "Completions" } }}
                valueFormatter={idNumber}
                aria-label="Bar chart of survey completions per week"
              />
            </ChartPanel>
          </div>
          <div data-specimen="bar-grouped">
            <ChartPanel
              title="Started and completed"
              description="Surveys · last 6 weeks · grouped"
              summary="Completed surveys trail started surveys by about 80 each week."
              columns={CH_TREND_COLUMNS}
              rows={CH_SURVEY_TREND.slice(-6)}
            >
              <BarChart
                className="aspect-auto h-64"
                data={CH_SURVEY_TREND.slice(-6)}
                categoryKey="week"
                config={{ started: { label: "Started" }, completed: { label: "Completed" } }}
                valueFormatter={idNumber}
              />
            </ChartPanel>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div data-specimen="bar-horizontal">
            <ChartPanel
              title="Impressions by city"
              description="Horizontal bars · compact axis"
              summary="Jakarta has the most impressions, 4.800, then Bandung with 3.200."
              columns={CH_CITY_COLUMNS}
              rows={CH_CITIES}
            >
              <BarChart className="aspect-auto h-64" data={CH_CITIES} categoryKey="city" layout="vertical" config={CH_CITY_CONFIG} valueFormatter={idNumber} axisFormatter={idCompact} />
            </ChartPanel>
          </div>
          <div data-specimen="bar-stacked">
            <ChartPanel
              title="Impressions by city, stacked"
              description="Stacked · square joins"
              summary="Roadside and urban impressions are stacked per city."
              columns={CH_CITY_COLUMNS}
              rows={CH_CITIES}
            >
              <BarChart className="aspect-auto h-64" data={CH_CITIES} categoryKey="city" stacked config={CH_CITY_CONFIG} valueFormatter={idNumber} axisFormatter={idCompact} />
            </ChartPanel>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-h3 font-bold text-ink-heading">Line</h2>
        <p className="text-caption text-muted-foreground">2px straight segments; points appear on hover or keyboard focus (arrow keys). Two series differ by shape as well as colour.</p>
        <div className="grid gap-4 lg:grid-cols-2">
          <div data-specimen="line-two">
            <ChartPanel title="Completion trend" description="Surveys · 12 weeks" summary="Started and completed surveys both grew steadily over 12 weeks, from 310 to 503 started and 248 to 433 completed." columns={CH_TREND_COLUMNS} rows={CH_SURVEY_TREND}>
              <LineChart className="aspect-auto h-64" data={CH_SURVEY_TREND} categoryKey="week" config={{ started: { label: "Started" }, completed: { label: "Completed" } }} valueFormatter={idNumber} />
            </ChartPanel>
          </div>
          <div data-specimen="line-one">
            <ChartPanel title="Monthly revenue" description="Rupiah · Jun–Nov 2026 · one series, Indonesian format" summary="Revenue grew from Rp 182 million in June to Rp 262 million in November." columns={CH_REVENUE_COLUMNS} rows={CH_REVENUE}>
              <LineChart className="aspect-auto h-64" data={CH_REVENUE} categoryKey="month" config={{ revenue: { label: "Revenue", color: "var(--chart-1)" } }} valueFormatter={idRupiah} axisFormatter={(v) => `Rp ${idCompact(v)}`} />
            </ChartPanel>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-h3 font-bold text-ink-heading">Area</h2>
        <p className="text-caption text-muted-foreground">Flat 20% fill with a 2px line on top; stacked layers use 40% fill. No gradient.</p>
        <div className="grid gap-4 lg:grid-cols-2">
          <div data-specimen="area-one">
            <ChartPanel title="Completed surveys" description="Surveys · 12 weeks · single series" summary="Completed surveys grew from 248 to 433 over 12 weeks." columns={CH_TREND_COLUMNS.filter((c) => c.key !== "started")} rows={CH_SURVEY_TREND}>
              <AreaChart className="aspect-auto h-64" data={CH_SURVEY_TREND} categoryKey="week" config={{ completed: { label: "Completed" } }} valueFormatter={idNumber} />
            </ChartPanel>
          </div>
          <div data-specimen="area-stacked">
            <ChartPanel title="Respondents by channel" description="Respondents · last 8 weeks · stacked" summary="QR code respondents grew fastest, from 38 to 152 a week, while panel stayed the largest channel." columns={CH_CHANNEL_COLUMNS} rows={CH_BY_CHANNEL}>
              <AreaChart className="aspect-auto h-64" data={CH_BY_CHANNEL} categoryKey="week" stacked config={{ panel: { label: "Panel" }, streetIntercept: { label: "Street intercept" }, qr: { label: "QR code" } }} valueFormatter={idNumber} />
            </ChartPanel>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-h3 font-bold text-ink-heading">Donut and Pie</h2>
        <p className="text-caption text-muted-foreground">Largest slice first from 12 o&apos;clock, 2px gaps, at most 5 slices then &quot;Other&quot;. The legend carries name, value and percent.</p>
        <div className="grid gap-4 lg:grid-cols-2">
          <div data-specimen="pie-donut">
            <ChartPanel title="Billboard status" description="Billboards · 7 statuses, 5 shown plus Other" summary="Of 946 billboards, 612 are active, 141 scheduled and 88 under maintenance." columns={[{ key: "name", label: "Status" }, { key: "value", label: "Billboards", format: idNumber }]} rows={CH_BILLBOARD_STATUS}>
              <PieChart data={CH_BILLBOARD_STATUS} centerCaption="Billboards" valueFormatter={idNumber} aria-label="Donut chart of billboard status" />
            </ChartPanel>
          </div>
          <div data-specimen="pie-pie">
            <ChartPanel title="Share by city" description="Millions of impressions · Pie" summary="Jakarta has 40,7% of impressions, Surabaya 23,7%, Bandung 19,5% and Medan 16,1%.">
              <PieChart data={CH_CITY_SHARE} donut={false} valueFormatter={idNumber} />
            </ChartPanel>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-h3 font-bold text-ink-heading">States</h2>
        <p className="text-caption text-muted-foreground">Loading, empty and error replace the plot; the card, title and header stay.</p>
        <div className="grid gap-4 lg:grid-cols-3">
          <div data-specimen="state-loading">
            <ChartPanel title="Loading" description="Skeleton, aria-busy" summary="Loading" state="loading">
              <div />
            </ChartPanel>
          </div>
          <div data-specimen="state-empty">
            <ChartPanel title="Empty" description="No data" summary="No data" state="empty">
              <div />
            </ChartPanel>
          </div>
          <div data-specimen="state-error">
            <ChartPanel
              title="Error"
              description={retries ? `Retried ${retries} time${retries > 1 ? "s" : ""}` : "With a retry"}
              summary="Error"
              state="error"
              onRetry={() => setRetries((n) => n + 1)}
            >
              <div />
            </ChartPanel>
          </div>
        </div>
        <p className="text-caption text-muted-foreground">
          Axis ticks in the compact Indonesian form: {idCompact(1_200_000)}, {idCompact(950)}, {idCompact(3_400_000_000)}.
        </p>
      </section>
    </>
  )
}

const CHAT_VARIANTS = ["default", "secondary", "muted", "tinted", "outline", "ghost", "destructive"] as const
type ChatTurn = { id: number; who: "me" | "bot"; text: string }
const CHAT_SEED: ChatTurn[] = Array.from({ length: 6 }, (_, i) => ({ id: i, who: i % 2 === 0 ? "me" : "bot", text: i % 2 === 0 ? `Question ${i / 2 + 1}` : "An answer that takes a couple of lines so the thread has some height to scroll through." }))
const CHAT_WORDS = "Jakarta leads with 612 active billboards, followed by Surabaya and Bandung. Maintenance is highest in Medan, where 88 units are under repair. Offline units are mostly in smaller cities and are being reviewed this week. A full table is available in the report.".split(" ")
function ChatSection() {
  const [open, setOpen] = React.useState(false)
  const [turns, setTurns] = React.useState<ChatTurn[]>(CHAT_SEED)
  const busy = React.useRef(false)
  const nextId = React.useRef(100)
  function send() {
    if (busy.current) return
    busy.current = true
    const replyId = nextId.current + 1
    setTurns((t) => [...t, { id: nextId.current, who: "me", text: "Summarise billboard status by city" }, { id: replyId, who: "bot", text: "" }])
    nextId.current += 2
    let i = 0
    const timer = setInterval(() => {
      const word = CHAT_WORDS[i]!
      const first = i === 0
      setTurns((t) => t.map((x) => (x.id === replyId ? { ...x, text: x.text + (first ? "" : " ") + word } : x)))
      i++
      if (i >= CHAT_WORDS.length) {
        clearInterval(timer)
        busy.current = false
      }
    }, 60)
  }
  return (
    <>
      <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">Chat pieces</p>
      <section className="flex flex-col gap-4">
        <h2 className="text-h3 font-bold text-ink-heading">Bubble</h2>
        <div className="flex flex-col gap-3" data-specimen="bubbles">
          {CHAT_VARIANTS.map((v) => (
            <Bubble key={v} variant={v}>
              <BubbleContent>{v} bubble with some text that wraps when it gets long enough to fill the row.</BubbleContent>
            </Bubble>
          ))}
          <Bubble variant="secondary" align="end"><BubbleContent render={<button type="button" />}>Interactive bubble (button)</BubbleContent></Bubble>
          <BubbleGroup>
            <Bubble variant="secondary" className="mb-3">
              <BubbleContent>With reactions</BubbleContent>
              <BubbleReactions>👍 2</BubbleReactions>
            </Bubble>
          </BubbleGroup>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-h3 font-bold text-ink-heading">Message and Marker</h2>
        <div className="flex max-w-xl flex-col gap-6" data-specimen="messages">
          <Marker variant="separator"><MarkerContent>Today</MarkerContent></Marker>
          <Message align="end">
            <MessageContent>
              <Bubble variant="secondary"><BubbleContent>How many billboards are active in Jakarta?</BubbleContent></Bubble>
            </MessageContent>
          </Message>
          <Message align="start">
            <MessageContent>
              <MessageHeader>Playlog assistant</MessageHeader>
              <Bubble variant="ghost"><BubbleContent>There are 612 active billboards, 141 scheduled and 88 under maintenance.</BubbleContent></Bubble>
              <MessageFooter>
                <Button variant="ghost" size="icon-sm" aria-label="Copy"><Icon name="clipboard" /></Button>
                <Button variant="ghost" size="icon-sm" aria-label="Good response" aria-pressed={true}><Icon name="thumbs-up" /></Button>
                <Button variant="ghost" size="icon-sm" aria-label="Bad response"><Icon name="thumbs-down" /></Button>
                <Button variant="ghost" size="icon-sm" aria-label="Retry"><Icon name="refresh" /></Button>
              </MessageFooter>
            </MessageContent>
          </Message>
          <Marker><MarkerIcon><Icon name="info" /></MarkerIcon><MarkerContent>Context was summarised</MarkerContent></Marker>
          <Marker variant="border"><MarkerContent>Border marker</MarkerContent></Marker>
          <Marker role="status"><MarkerIcon><Spinner className="size-4" /></MarkerIcon><MarkerContent>Checking the logs…</MarkerContent></Marker>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-h3 font-bold text-ink-heading">Trace</h2>
        <div className="max-w-xl" data-specimen="trace">
          <Trace>
            <TraceLine><TraceStatusIcon icon="terminal" /><TraceTitle>Ran pnpm test</TraceTitle></TraceLine>
            <TraceLine status="running"><TraceStatusIcon status="running" /><TraceTitle>Running pnpm build</TraceTitle></TraceLine>
            <TraceLine status="error"><TraceStatusIcon status="error" /><TraceTitle>Failed to run pnpm lint</TraceTitle><TraceDescription>exit 1</TraceDescription></TraceLine>
            <TraceLine status="pending"><TraceStatusIcon status="pending" /><TraceTitle>Waiting for approval</TraceTitle></TraceLine>
            <TraceCollapsible open={open} onOpenChange={setOpen}>
              <TraceCollapsibleTrigger>
                <TraceLine><TraceStatusIcon icon="brain" /><TraceTitle>Thought for 5s</TraceTitle></TraceLine>
              </TraceCollapsibleTrigger>
              <TraceCollapsibleContent>Checking the status counts first, then the city filter.</TraceCollapsibleContent>
            </TraceCollapsible>
          </Trace>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-h3 font-bold text-ink-heading">Message Scroller</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" data-testid="send" onClick={send}>Send</Button>
          <Button variant="outline" size="sm" data-testid="reset" onClick={() => setTurns(CHAT_SEED)}>Reset</Button>
        </div>
        <div className="relative h-80 max-w-xl overflow-hidden rounded-lg border-(length:--pl-border-width) border-border" data-specimen="scroller">
          <MessageScrollerProvider autoScroll defaultScrollPosition="last-anchor">
            <MessageScroller>
              <MessageScrollerViewport>
                <MessageScrollerContent className="py-6">
                  {turns.map((t) => (
                    <MessageScrollerItem key={t.id} messageId={String(t.id)} scrollAnchor={t.who === "me"}>
                      <Message align={t.who === "me" ? "end" : "start"}>
                        <MessageContent>
                          <Bubble variant={t.who === "me" ? "secondary" : "ghost"}><BubbleContent>{t.text}</BubbleContent></Bubble>
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  ))}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </MessageScrollerProvider>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-h3 font-bold text-ink-heading">Attachment</h2>
        <div className="flex max-w-xl flex-col gap-3" data-specimen="attachments">
          <Attachment><AttachmentMedia><Icon name="sticky-note" /></AttachmentMedia><AttachmentContent><AttachmentTitle>report-nov.pdf</AttachmentTitle><AttachmentDescription>2,4 MB</AttachmentDescription></AttachmentContent><AttachmentActions><AttachmentAction aria-label="Remove"><Icon name="close" /></AttachmentAction></AttachmentActions></Attachment>
          <Attachment state="idle"><AttachmentMedia><Icon name="sticky-note" /></AttachmentMedia><AttachmentContent><AttachmentTitle>Drop a file</AttachmentTitle><AttachmentDescription>or browse</AttachmentDescription></AttachmentContent></Attachment>
          <Attachment state="uploading"><AttachmentMedia><Spinner className="size-4" /></AttachmentMedia><AttachmentContent><AttachmentTitle>upload.csv</AttachmentTitle><AttachmentDescription>Uploading…</AttachmentDescription></AttachmentContent></Attachment>
          <Attachment state="error"><AttachmentMedia><Icon name="alert-circle" /></AttachmentMedia><AttachmentContent><AttachmentTitle>big.mov</AttachmentTitle><AttachmentDescription>Too large (max 25 MB)</AttachmentDescription></AttachmentContent></Attachment>
          <Attachment size="sm"><AttachmentMedia><Icon name="sticky-note" /></AttachmentMedia><AttachmentContent><AttachmentTitle>small.txt</AttachmentTitle><AttachmentDescription>1 KB</AttachmentDescription></AttachmentContent><AttachmentTrigger aria-label="Open small.txt" /></Attachment>
          <Attachment size="xs"><AttachmentMedia><Icon name="sticky-note" /></AttachmentMedia><AttachmentContent><AttachmentTitle>tiny.txt</AttachmentTitle></AttachmentContent></Attachment>
          <AttachmentGroup>
            {[1, 2, 3, 4].map((n) => (
              <Attachment key={n} orientation="vertical"><AttachmentMedia><Icon name="sticky-note" /></AttachmentMedia><AttachmentContent><AttachmentTitle>file-{n}.png</AttachmentTitle></AttachmentContent></Attachment>
            ))}
          </AttachmentGroup>
        </div>
      </section>
    </>
  )
}

const AI_SOURCES = [
  { url: "https://docs.playlog.example/reach-methodology", title: "Reach methodology" },
  { url: "https://www.playlog.example/city-report", title: "City report, Q3 2025" },
  { url: "https://docs.playlog.example/screen-audit" },
]
const AI_CITATION = { url: "https://docs.playlog.example/reach-methodology", title: "Reach methodology", description: "How reach is counted per screen and per period." }
const AI_FILE = new File(["x"], "city-report.csv")
const AI_CANNED = "Reach counts each person once per screen and period, so adding two periods together can count the same person twice. Compare periods side by side instead."
function AiLiveChat() {
  const [turns, setTurns] = React.useState<{ id: string; text: string; reply: string; done: boolean }[]>([])
  const [streaming, setStreaming] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setInterval> | null>(null)
  const idRef = React.useRef(0)
  function stop() {
    if (timer.current) clearInterval(timer.current)
    timer.current = null
    setStreaming(false)
    setTurns((c) => c.map((t) => ({ ...t, done: true })))
  }
  function send(text: string) {
    const id = `live-${++idRef.current}`
    const words = AI_CANNED.split(" ")
    let count = 0
    setTurns((c) => [...c, { id, text, reply: "", done: false }])
    setStreaming(true)
    timer.current = setInterval(() => {
      count += 1
      setTurns((c) => c.map((t) => (t.id === id ? { ...t, reply: words.slice(0, count).join(" "), done: count >= words.length } : t)))
      if (count >= words.length) {
        if (timer.current) clearInterval(timer.current)
        timer.current = null
        setStreaming(false)
      }
    }, 45)
  }
  return (
    <Chat>
      <ChatHeader title="New thread" description="Ask about reach, impressions and screens." action={<Button variant="outline" size="icon" aria-label="Reset conversation" disabled={streaming} onClick={() => setTurns([])}><Icon name="refresh" /></Button>} />
      {turns.length === 0 ? (
        <div className="min-h-0 flex-1">
          <ChatEmpty>
            <Suggestions className="justify-center">
              <Suggestion suggestion="Top cities by reach in Q3 2025" onSuggestionClick={send} />
              <Suggestion suggestion="Impressions by product line" onSuggestionClick={send} />
              <Suggestion suggestion="Which screens were offline?" onSuggestionClick={send} />
            </Suggestions>
          </ChatEmpty>
        </div>
      ) : (
        <ChatThread busy={streaming}>
          {turns.map((turn) => (
            <React.Fragment key={turn.id}>
              <ChatTurn id={`${turn.id}-u`} anchor><UserMessage>{turn.text}</UserMessage></ChatTurn>
              <ChatTurn id={`${turn.id}-a`}>
                <AssistantMessage actions={turn.done ? <AssistantMessageActions text={turn.reply} onRetry={() => send(turn.text)} /> : undefined}>
                  {turn.reply === "" ? (
                    <Marker role="status"><MarkerIcon><Spinner className="size-4" /></MarkerIcon><MarkerContent>Thinking…</MarkerContent></Marker>
                  ) : (
                    <p>{turn.reply}</p>
                  )}
                </AssistantMessage>
              </ChatTurn>
            </React.Fragment>
          ))}
        </ChatThread>
      )}
      <ChatFooter>
        <PromptInput status={streaming ? "streaming" : "ready"} onSubmit={({ text }) => send(text)} onStop={stop} placeholder="Ask about reach, impressions or screens" />
      </ChatFooter>
    </Chat>
  )
}
const QUERY = `SELECT city, SUM(impressions) AS impressions, MAX(reach) AS reach
FROM city_report
WHERE period = 'Q3 2025'
GROUP BY city
ORDER BY reach DESC
LIMIT 3;`
const DIFF = `const periods = ["Q1 2025", "Q2 2025"]
const periods = ["Q1 2025", "Q2 2025", "Q3 2025"]
const label = (p: string) => p.toUpperCase()`
function HighlightedCode({ code, language, title, lineNumbers, variants, size, wrap, variant }: { code: string; language: string; title?: string; lineNumbers?: boolean; variants?: Record<number, "added" | "removed" | "highlighted">; size?: "default" | "sm"; wrap?: boolean; variant?: "default" | "destructive" }) {
  const lines = useHighlightedCode(code, language)
  return (
    <CodeBlock size={size} variant={variant}>
      {title ? (
        <CodeBlockHeader><CodeBlockTitle>{title}</CodeBlockTitle><CodeBlockActions><CodeBlockCopyButton value={code} /></CodeBlockActions></CodeBlockHeader>
      ) : (
        <CodeBlockActions><CodeBlockCopyButton value={code} /></CodeBlockActions>
      )}
      <CodeBlockContent lineNumbers={lineNumbers} wrap={wrap}>
        {lines.map((line, index) => (<CodeBlockLine key={index} variant={variants?.[index + 1]}>{line}</CodeBlockLine>))}
      </CodeBlockContent>
    </CodeBlock>
  )
}
function AiSection() {
  const [picked, setPicked] = React.useState("")
  const [sent, setSent] = React.useState("")
  const [answer, setAnswer] = React.useState("")
  return (
    <>
      <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">AI elements</p>
      <section className="flex max-w-xl flex-col gap-4">
        <h2 className="text-h3 font-bold text-ink-heading">Suggestion</h2>
        <Suggestions data-specimen="suggestions">
          {["Which cities lead on reach?", "Summarise Q3", "Compare Jakarta and Bandung"].map((s) => (
            <Suggestion key={s} suggestion={s} onSuggestionClick={setPicked} />
          ))}
        </Suggestions>
        <p className="text-caption text-muted-foreground" data-testid="picked">{picked ? `Sent: ${picked}` : "Nothing sent yet"}</p>
      </section>
      <section className="flex max-w-xl flex-col gap-4">
        <h2 className="text-h3 font-bold text-ink-heading">Prompt Input</h2>
        <div className="flex flex-col gap-4" data-specimen="prompt">
          <PromptInput onSubmit={(m) => setSent(m.text)} />
          <PromptInput defaultText="Which cities lead on reach in Q3?" defaultFiles={[AI_FILE]} />
          <PromptInput status="streaming" defaultText="A message being answered" />
          <PromptInput status="disabled" />
        </div>
        <p className="text-caption text-muted-foreground" data-testid="sent">{sent ? `Submitted: ${sent}` : "Nothing submitted yet"}</p>
      </section>
      <section className="flex max-w-xl flex-col gap-4">
        <h2 className="text-h3 font-bold text-ink-heading">Reasoning, Sources, Inline Citation, Confirmation</h2>
        <div className="flex flex-col gap-4" data-specimen="agent">
          <Trace>
            <Reasoning running>Checking the city report first, then the screen audit.</Reasoning>
            <Reasoning duration={5}>Checked the city report, then the screen audit.</Reasoning>
            <Reasoning duration={3} />
            <Sources sources={AI_SOURCES} />
          </Trace>
          <p className="text-body-sm">
            Jakarta leads on reach in Q3<InlineCitation source={AI_CITATION} />, ahead of Surabaya and Bandung.
          </p>
          <Confirmation title="Run pnpm build?" description="Builds every package in the repo." onApprove={() => setAnswer("Approved")} onDeny={() => setAnswer("Denied")} />
          <Confirmation title="Delete the cache?" description="Frees 1.2 GB." disabled />
          <p className="text-caption text-muted-foreground" data-testid="answer">{answer || "No answer yet"}</p>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-h3 font-bold text-ink-heading">Tool and Code Block</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-3" data-specimen="tool">
            <p className="text-caption text-muted-foreground">Tool: running, done, failed (open), denied, pending.</p>
            <Trace>
              <Tool state="running" command="pnpm test" />
              <Tool state="done" command="git status --short" output={" M apps/web/src/App.tsx\n M packages/ui/package.json"} />
              <Tool state="error" command="pnpm build" output="Command timed out after 120 seconds." />
              <Tool state="denied" command="rm -rf dist" />
              <Tool state="pending" command="pnpm lint" />
            </Trace>
          </div>
          <div className="grid gap-4 md:col-span-2 md:grid-cols-2" data-specimen="code">
            <HighlightedCode code={QUERY} language="sql" title="reach-by-city.sql" lineNumbers />
            <HighlightedCode code={DIFF} language="typescript" title="periods.ts" lineNumbers variants={{ 1: "removed", 2: "added", 3: "highlighted" }} />
            <HighlightedCode code={"pnpm build\npnpm: command not found"} language="bash" size="sm" variant="destructive" title="Failed" />
            <CodeBlock size="sm">
              <CodeBlockContent wrap>{"Plain output with no language, wrapped. A long line wraps instead of scrolling: the quick brown fox jumps over the lazy dog."}</CodeBlockContent>
              <CodeBlockFooter><span className="text-caption">Footer text</span></CodeBlockFooter>
            </CodeBlock>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-h3 font-bold text-ink-heading">Chat</h2>
        <p className="text-caption text-muted-foreground">Static thread: turns, reasoning, citations, sources, a pending approval and a status marker.</p>
        <div className="h-160 overflow-hidden rounded-lg border-(length:--pl-border-width) border-border bg-background" data-specimen="chat-static">
          <Chat>
            <ChatHeader title="Q3 reach review" description="Static mock conversation, no model." />
            <ChatThread>
              <ChatTurn id="u1" anchor>
                <UserMessage actions={<UserMessageActions text="Which three cities had the highest reach in Q3 2025?" onEdit={() => {}} />}>
                  Which three cities had the highest reach in Q3 2025?
                </UserMessage>
              </ChatTurn>
              <ChatTurn id="a1">
                <AssistantMessage actions={<AssistantMessageActions text="Jakarta Selatan, Surabaya and Bandung led reach in Q3 2025." onRetry={() => {}} />}>
                  <Trace>
                    <Reasoning duration={4}>The city report is keyed by period, so I can group Q3 2025 by city and sort by reach.</Reasoning>
                  </Trace>
                  <p>Jakarta Selatan, Surabaya and Bandung led reach in Q3 2025 (July to September, 25 cities). <InlineCitation source={AI_CITATION} /></p>
                  <ul className="flex list-disc flex-col gap-1 pl-5">
                    <li>Jakarta Selatan: 1,28 M reach from 4,2 M impressions.</li>
                    <li>Surabaya: 902 K reach from 3,1 M impressions.</li>
                  </ul>
                  <HighlightedCode code={QUERY} language="sql" title="reach-by-city.sql" size="sm" />
                  <Sources sources={AI_SOURCES} />
                </AssistantMessage>
              </ChatTurn>
              <ChatTurn id="u2" anchor>
                <UserMessage>Check the screen audit against this and clean up the old export.</UserMessage>
              </ChatTurn>
              <ChatTurn id="a2">
                <AssistantMessage>
                  <Trace><Reasoning running>Comparing the audit with the city report. Deleting the old export cannot be undone, so I should ask first.</Reasoning></Trace>
                  <Confirmation title="Run rm -rf exports/q3-old?" description="The command deletes the old export in this project." />
                  <Marker role="status"><MarkerIcon><Spinner className="size-4" /></MarkerIcon><MarkerContent>Waiting for your answer…</MarkerContent></Marker>
                </AssistantMessage>
              </ChatTurn>
            </ChatThread>
            <ChatFooter>
              <Suggestions>
                <Suggestion suggestion="Compare with Q2 2025" />
                <Suggestion suggestion="Export as CSV" />
              </Suggestions>
              <PromptInput status="disabled" placeholder="Answer the question above to continue" />
            </ChatFooter>
          </Chat>
        </div>
        <p className="text-caption text-muted-foreground">Live thread (canned reply): type and press Enter, Escape stops the reply.</p>
        <div className="h-128 overflow-hidden rounded-lg border-(length:--pl-border-width) border-border bg-background" data-specimen="chat-live">
          <AiLiveChat />
        </div>
      </section>
    </>
  )
}

const AG_PLAN: PlanStep[] = [
  { title: "Install @base-ui/react", state: "done" },
  { title: "Replace the Radix imports", state: "done" },
  { title: "Rename asChild to render", state: "running" },
  { title: "Update the snapshots", state: "pending" },
  { title: "Migrate the toast", state: "skipped" },
  { title: "Run the type checker", state: "error" },
]
const AG_TODOS: QueueTodo[] = [
  { id: "1", title: "Add a changeset", status: "completed" },
  { id: "2", title: "Write the migration guide", description: "Cover the renamed props and the new data attributes.", status: "completed" },
  { id: "3", title: "Fix the focus ring on the select trigger", description: "It is clipped by overflow-hidden on the field.", status: "in-progress" },
  { id: "4", title: "Update the registry snapshots", status: "pending" },
  { id: "5", title: "Add tests for the combobox", status: "pending" },
]
const AG_PROVIDERS: ModelProvider[] = [
  { name: "Provider A", models: [{ value: "alpha-large", label: "Alpha Large", badge: "New" }, { value: "alpha-small", label: "Alpha Small" }] },
  { name: "Provider B", models: [{ value: "beta-2", label: "Beta 2" }, { value: "beta-1", label: "Beta 1", disabled: true }] },
]
const AG_USAGE = [{ label: "Input", value: 8420 }, { label: "Output", value: 260 }, { label: "Reasoning", value: 980 }]
function AgPanel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <p className="text-caption text-muted-foreground">{label}</p>
      <div className="rounded-lg border-(length:--pl-border-width) border-border bg-card p-4 text-body-sm">{children}</div>
    </div>
  )
}
function AgentSection() {
  const [model, setModel] = React.useState("alpha-large")
  const [effort, setEffort] = React.useState("medium")
  const [restored, setRestored] = React.useState(false)
  return (
    <>
      <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">Agent</p>
      <section className="flex flex-col gap-4">
        <h2 className="text-h3 font-bold text-ink-heading">Chain of Thought</h2>
        <div className="flex flex-wrap items-start gap-6" data-specimen="cot">
          <AgPanel label="Running (open)"><Trace><ChainOfThought running>
            <ChainOfThoughtStep title="Read the build log for dpl_8Kx2" icon="terminal" />
            <ChainOfThoughtStep title="Searching the web for image cache key" status="running" />
          </ChainOfThought></Trace></AgPanel>
          <AgPanel label="Done (closed)"><Trace><ChainOfThought>
            <ChainOfThoughtStep title="Read the build log for dpl_8Kx2" icon="terminal" />
            <ChainOfThoughtStep title="Searched the web for image cache key"><ChainOfThoughtBadges items={["nextjs.org", "vercel.com"]} /></ChainOfThoughtStep>
          </ChainOfThought></Trace></AgPanel>
          <AgPanel label="Done (open), one failed"><Trace><ChainOfThought defaultOpen failed={1}>
            <ChainOfThoughtStep title="Searched the code for cacheKey"><ChainOfThoughtBadges items={["next.config.ts", "scripts/optimize-images.ts"]} /></ChainOfThoughtStep>
            <ChainOfThoughtStep title="Failed to read the deploy settings" status="error">{"Error: 403 Forbidden"}</ChainOfThoughtStep>
          </ChainOfThought></Trace></AgPanel>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-h3 font-bold text-ink-heading">Plan and Task</h2>
        <div className="flex flex-wrap items-start gap-6" data-specimen="plan">
          <AgPanel label="Plan: every step state"><Trace><Plan title="Plan: migrate to Base UI" steps={AG_PLAN} /></Trace></AgPanel>
          <AgPanel label="Plan with a description, closed"><Trace>
            <Plan title="Plan: add dark mode" defaultOpen={false} description="Store the theme in a cookie so the server renders the right one." steps={[{ title: "Add a dark variant to the tokens", state: "done" }, { title: "Add a toggle to the settings page", state: "pending" }]} />
          </Trace></AgPanel>
          <AgPanel label="Task: running, failed and done"><Trace>
            <Task title="Updating the page metadata" status="running">
              <TaskStep title="Searched for app/page.tsx" />
              <TaskStep title="Reading app/layout.tsx" icon="sticky-note" status="running" />
            </Task>
            <Task title="Failed to update the sitemap" status="error" defaultOpen>
              <TaskStep title="Failed to read sitemap.ts" icon="sticky-note" status="error" />
            </Task>
            <Task title="Found the project files">
              <TaskStep title="Searched for app/page.tsx" />
              <TaskStep title="Read app/page.tsx" icon="sticky-note" href="#files" />
            </Task>
          </Trace></AgPanel>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-h3 font-bold text-ink-heading">Queue</h2>
        <div className="flex flex-wrap items-start gap-6" data-specimen="queue">
          <AgPanel label="Mixed"><Trace><Queue todos={AG_TODOS} /></Trace></AgPanel>
          <AgPanel label="Only completed"><Trace><Queue todos={AG_TODOS.filter((t) => t.status === "completed")} /></Trace></AgPanel>
          <AgPanel label="Empty (renders nothing)"><Queue todos={[]} /><p className="text-caption text-muted-foreground">No output.</p></AgPanel>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-h3 font-bold text-ink-heading">Context</h2>
        <div className="flex flex-wrap items-center gap-4" data-specimen="context">
          <Context used={9660} limit={128000} usage={AG_USAGE} />
          <Context used={102400} limit={128000} />
          <Context used={121600} limit={128000} />
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-h3 font-bold text-ink-heading">Checkpoint</h2>
        <div className="flex w-full max-w-md flex-col gap-4 text-body-sm" data-specimen="checkpoint">
          <Message align="end"><MessageContent><Bubble align="end" variant="secondary"><BubbleContent>Rename the button component to action.</BubbleContent></Bubble></MessageContent></Message>
          <Message><MessageContent><p>Renamed Button to Action in components/ui/button.tsx.</p></MessageContent></Message>
          <Checkpoint label="Button renamed" onRestore={() => setRestored(true)} />
          {!restored ? (
            <Message align="end"><MessageContent><Bubble align="end" variant="secondary"><BubbleContent>Update the docs to match.</BubbleContent></Bubble></MessageContent></Message>
          ) : (
            <p className="text-caption text-muted-foreground" data-testid="restored">Restored: the later message was removed.</p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-h3 font-bold text-ink-heading">Subagent</h2>
        <div className="flex flex-wrap items-start gap-6" data-specimen="subagent">
          <AgPanel label="Running"><Message><MessageContent className="gap-3"><Trace>
            <Subagent name="research agent" state="running">
              <Tool state="done" command="grep -rn cacheKey scripts" />
              <Tool state="running" command="cat next.config.ts" />
            </Subagent>
          </Trace></MessageContent></Message></AgPanel>
          <AgPanel label="Done (open) with its result"><Message><MessageContent className="gap-3"><Trace>
            <Subagent name="research agent" state="done" defaultOpen result={<p>The cache is keyed on the commit SHA. Key it on the image directory instead.</p>}>
              <Tool state="done" command="grep -rn cacheKey scripts" />
            </Subagent>
          </Trace></MessageContent></Message></AgPanel>
          <AgPanel label="Failed"><Trace>
            <Subagent name="review agent" state="error" error={"Error: the agent stopped after 3 tool calls (limit reached)."}>
              <Tool state="done" command="pnpm lint" />
            </Subagent>
          </Trace></AgPanel>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-h3 font-bold text-ink-heading">Model Selector</h2>
        <div className="flex max-w-xl flex-col gap-4" data-specimen="model">
          <InputGroup>
            <InputGroupTextarea placeholder="Ask the agent to change your code…" rows={2} />
            <InputGroupAddon align="block-end">
              <ModelSelector providers={AG_PROVIDERS} model={model} onModelChange={setModel} effort={effort} onEffortChange={setEffort} />
              <InputGroupButton size="icon-sm" variant="default" className="ml-auto" aria-label="Send"><Icon name="send" /></InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup className="opacity-(--pl-opacity-disabled)">
            <InputGroupTextarea placeholder="Ask the agent to change your code…" disabled rows={2} />
            <InputGroupAddon align="block-end">
              <ModelSelector providers={AG_PROVIDERS} model={model} onModelChange={setModel} effort={effort} onEffortChange={setEffort} disabled />
              <InputGroupButton size="icon-sm" variant="default" className="ml-auto" aria-label="Send" disabled><Icon name="send" /></InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <p className="text-caption text-muted-foreground" data-testid="model-value">{model} / {effort}</p>
        </div>
      </section>
    </>
  )
}

function ButtonSection() {
  return (
    <section id="button" className="flex flex-col gap-6">
      <h2 className="text-h2 text-ink-heading">Button</h2>
      <div className="flex flex-col gap-3">
        {variants.map((variant) => (
          <div key={variant} className="flex flex-wrap items-center gap-3">
            <span className="w-28 text-caption text-muted-foreground">{variant}</span>
            {sizes.map((size) => (
              <Button key={size} variant={variant} size={size} data-specimen={`button-${variant}-${size}`}>
                Button
              </Button>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="w-28 text-caption text-muted-foreground">icon only</span>
        {iconSizes.map((size) => (
          <Button key={size} variant="outline" size={size} data-specimen={`button-icon-${size}`}>
            <Icon name="plus" />
            <span className="sr-only">Add</span>
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="w-28 text-caption text-muted-foreground">with icon</span>
        <Button data-specimen="button-icon-start">
          <Icon name="plus" />
          New report
        </Button>
        <Button variant="outline" data-specimen="button-icon-end">
          Next
          <Icon name="chevron-right" />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="w-28 text-caption text-muted-foreground">states</span>
        <Button disabled data-specimen="button-disabled">Disabled</Button>
        <Button variant="outline" disabled data-specimen="button-disabled-outline">Disabled</Button>
        <Button variant="outline" aria-pressed="true" data-specimen="button-pressed">Pressed</Button>
        <Button variant="outline" aria-invalid="true" data-specimen="button-invalid">Invalid</Button>
        <Button
          nativeButton={false}
          render={<a href="#button" />}
          variant="link"
          data-specimen="button-as-link"
        >
          As link
        </Button>
      </div>
    </section>
  )
}

function InputSection() {
  const [email, setEmail] = React.useState("")
  return (
    <section id="input" className="flex flex-col gap-6">
      <h2 className="text-h2 text-ink-heading">Input and Label</h2>
      <div className="grid max-w-md gap-6">
        <div className="grid gap-1.5">
          <Label htmlFor="in-default">Label</Label>
          <Input id="in-default" placeholder="Placeholder" data-specimen="input-default" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="in-value">With value</Label>
          <Input id="in-value" defaultValue="Jakarta" data-specimen="input-value" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="in-required" required>Required</Label>
          <Input id="in-required" required placeholder="name@company.com" data-specimen="input-required" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="in-v-model">Controlled (v-model)</Label>
          <Input
            id="in-v-model"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type here"
            data-specimen="input-model"
          />
          <p className="text-caption text-muted-foreground">Model value: {email || "(empty)"}</p>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="in-invalid">Invalid</Label>
          <Input
            id="in-invalid"
            aria-invalid="true"
            aria-describedby="in-invalid-error"
            defaultValue="not-an-email"
            data-specimen="input-invalid"
          />
          <p id="in-invalid-error" role="alert" className="text-caption text-danger-text">
            Enter an email address, for example name@company.com.
          </p>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="in-disabled">Disabled</Label>
          <Input id="in-disabled" disabled defaultValue="Cannot edit" data-specimen="input-disabled" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="in-file">File</Label>
          <Input id="in-file" type="file" data-specimen="input-file" />
        </div>
      </div>
    </section>
  )
}

function FormsSection() {
  const row = "flex items-center gap-2.5"
  return (
    <section id="forms" className="flex flex-col gap-6">
      <h2 className="text-h2 text-ink-heading">Forms: Textarea, Checkbox, Switch, Radio Group</h2>
      <div className="grid max-w-md gap-6">
        <div className="grid gap-1.5">
          <Label htmlFor="ta-default">Textarea</Label>
          <Textarea id="ta-default" placeholder="Write a note" data-specimen="textarea-default" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="ta-value">With value</Label>
          <Textarea id="ta-value" defaultValue="Roadside reach grew in Q1." data-specimen="textarea-value" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="ta-invalid">Invalid</Label>
          <Textarea id="ta-invalid" aria-invalid="true" defaultValue="x" data-specimen="textarea-invalid" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="ta-disabled">Disabled</Label>
          <Textarea id="ta-disabled" disabled defaultValue="Cannot edit" data-specimen="textarea-disabled" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className={row}><Checkbox id="cb-off" data-specimen="checkbox-off" /><Label htmlFor="cb-off">Unchecked</Label></div>
        <div className={row}><Checkbox id="cb-on" defaultChecked data-specimen="checkbox-on" /><Label htmlFor="cb-on">Checked</Label></div>
        <div className={row}><Checkbox id="cb-invalid" aria-invalid="true" data-specimen="checkbox-invalid" /><Label htmlFor="cb-invalid">Invalid</Label></div>
        <div className={row}><Checkbox id="cb-invalid-on" defaultChecked aria-invalid="true" data-specimen="checkbox-invalid-on" /><Label htmlFor="cb-invalid-on">Invalid, checked</Label></div>
        <div className={row}><Checkbox id="cb-dis" disabled data-specimen="checkbox-disabled" /><Label htmlFor="cb-dis">Disabled</Label></div>
        <div className={row}><Checkbox id="cb-dis-on" disabled defaultChecked data-specimen="checkbox-disabled-on" /><Label htmlFor="cb-dis-on">Disabled, checked</Label></div>
      </div>
      <div className="flex flex-col gap-3">
        <div className={row}><Switch id="sw-off" data-specimen="switch-off" /><Label htmlFor="sw-off">Off</Label></div>
        <div className={row}><Switch id="sw-on" defaultChecked data-specimen="switch-on" /><Label htmlFor="sw-on">On</Label></div>
        <div className={row}><Switch id="sw-sm-off" size="sm" data-specimen="switch-sm-off" /><Label htmlFor="sw-sm-off">Small, off</Label></div>
        <div className={row}><Switch id="sw-sm-on" size="sm" defaultChecked data-specimen="switch-sm-on" /><Label htmlFor="sw-sm-on">Small, on</Label></div>
        <div className={row}><Switch id="sw-invalid" aria-invalid="true" data-specimen="switch-invalid" /><Label htmlFor="sw-invalid">Invalid</Label></div>
        <div className={row}><Switch id="sw-dis" disabled data-specimen="switch-disabled" /><Label htmlFor="sw-dis">Disabled</Label></div>
      </div>
      <RadioGroup defaultValue="roadside" className="max-w-md">
        <div className={row}><RadioGroupItem id="rg-1" value="roadside" data-specimen="radio-on" /><Label htmlFor="rg-1">Roadside</Label></div>
        <div className={row}><RadioGroupItem id="rg-2" value="transit" data-specimen="radio-off" /><Label htmlFor="rg-2">Transit</Label></div>
        <div className={row}><RadioGroupItem id="rg-3" value="place" aria-invalid="true" data-specimen="radio-invalid" /><Label htmlFor="rg-3">Invalid</Label></div>
        <div className={row}><RadioGroupItem id="rg-4" value="ambience" disabled data-specimen="radio-disabled" /><Label htmlFor="rg-4">Disabled</Label></div>
      </RadioGroup>
    </section>
  )
}

const CITIES = [
  { value: "jakarta", label: "Jakarta" },
  { value: "bandung", label: "Bandung" },
  { value: "surabaya", label: "Surabaya" },
  { value: "medan", label: "Medan" },
  { value: "makassar", label: "Makassar" },
]

function SelectFieldSection() {
  const specimens = [
    { id: "default", defaultValue: undefined, size: undefined, invalid: false, disabled: false },
    { id: "value", defaultValue: "jakarta", size: undefined, invalid: false, disabled: false },
    { id: "sm", defaultValue: "bandung", size: "sm" as const, invalid: false, disabled: false },
    { id: "invalid", defaultValue: "jakarta", size: undefined, invalid: true, disabled: false },
    { id: "disabled", defaultValue: "jakarta", size: undefined, invalid: false, disabled: true },
  ]
  return (
    <section id="batch2" className="flex flex-col gap-6">
      <h2 className="text-h2 text-ink-heading">Batch 2: Select, Native Select, Field, Input Group</h2>
      <div className="flex flex-wrap items-center gap-3">
        {specimens.map((s) => (
          <Select key={s.id} items={CITIES} defaultValue={s.defaultValue} disabled={s.disabled}>
            <SelectTrigger
              size={s.size}
              aria-label={`City ${s.id}`}
              aria-invalid={s.invalid ? "true" : undefined}
              className="w-48"
              data-specimen={`select-${s.id}`}
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
                <SelectItem value="makassar" disabled>Makassar</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <NativeSelect className="w-48" aria-label="Native default" data-specimen="native-default">
          <NativeSelectOption value="">Choose a city</NativeSelectOption>
          <NativeSelectOptGroup label="Java">
            <NativeSelectOption value="jakarta">Jakarta</NativeSelectOption>
            <NativeSelectOption value="bandung">Bandung</NativeSelectOption>
          </NativeSelectOptGroup>
        </NativeSelect>
        <NativeSelect className="w-48" size="sm" aria-label="Native small" data-specimen="native-sm">
          <NativeSelectOption value="jakarta">Jakarta</NativeSelectOption>
        </NativeSelect>
        <NativeSelect className="w-48" aria-label="Native invalid" aria-invalid="true" data-specimen="native-invalid">
          <NativeSelectOption value="jakarta">Jakarta</NativeSelectOption>
        </NativeSelect>
        <NativeSelect className="w-48" disabled aria-label="Native disabled" data-specimen="native-disabled">
          <NativeSelectOption value="jakarta">Jakarta</NativeSelectOption>
        </NativeSelect>
      </div>
      <FieldGroup className="max-w-md" data-specimen="field-group">
        <FieldSet data-specimen="field-set">
          <FieldLegend>Report settings</FieldLegend>
          <Field data-specimen="field-vertical">
            <FieldLabel htmlFor="f-name">Report name</FieldLabel>
            <InputGroup>
              <InputGroupInput id="f-name" defaultValue="Roadside reach Q1" />
            </InputGroup>
            <FieldDescription>Shown in the report header.</FieldDescription>
          </Field>
          <Field data-specimen="field-error-state">
            <FieldLabel htmlFor="f-reach">Target reach</FieldLabel>
            <InputGroup>
              <InputGroupInput id="f-reach" aria-invalid="true" defaultValue="120" />
              <InputGroupAddon align="inline-end"><InputGroupText>%</InputGroupText></InputGroupAddon>
            </InputGroup>
            <FieldDescription>Hidden while the error shows.</FieldDescription>
            <FieldError>Reach can't be above 100%.</FieldError>
          </Field>
          <Field orientation="horizontal" data-specimen="field-horizontal">
            <Checkbox id="f-share" />
            <FieldLabel htmlFor="f-share">Share with the team</FieldLabel>
          </Field>
        </FieldSet>
        <FieldSeparator data-specimen="field-separator">Or</FieldSeparator>
        <Field>
          <FieldLabel htmlFor="f-search">Search</FieldLabel>
          <InputGroup data-specimen="ig-search">
            <InputGroupAddon><Icon name="search" /></InputGroupAddon>
            <InputGroupInput id="f-search" placeholder="Search cities" />
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="f-url">Dashboard URL</FieldLabel>
          <InputGroup data-specimen="ig-url">
            <InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon>
            <InputGroupInput id="f-url" defaultValue="playlog.id/reach" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs" aria-label="Copy link"><Icon name="clipboard" /></InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="f-note">Note</FieldLabel>
          <InputGroup data-specimen="ig-textarea">
            <InputGroupTextarea id="f-note" placeholder="Write a note" />
            <InputGroupAddon align="block-end"><InputGroupText>0 / 280</InputGroupText></InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="f-dis">Disabled</FieldLabel>
          <InputGroup data-specimen="ig-disabled">
            <InputGroupInput id="f-dis" disabled defaultValue="Cannot edit" />
          </InputGroup>
        </Field>
      </FieldGroup>
    </section>
  )
}

const CITY_LIST = ["Jakarta", "Bandung", "Surabaya", "Medan", "Makassar"]

function Batch3Section() {
  const anchor = useComboboxAnchor()
  const sizes = ["sm", "default", "lg"] as const
  const cbList = (items: string[]) => (
    <ComboboxContent>
      <ComboboxEmpty>No results</ComboboxEmpty>
      <ComboboxList>
        {(item: string) => (
          <ComboboxItem key={item} value={item}>
            {item}
          </ComboboxItem>
        )}
      </ComboboxList>
    </ComboboxContent>
  )
  return (
    <section id="batch3" className="flex flex-col gap-6">
      <h2 className="text-h2 text-ink-heading">Batch 3: Toggle, Toggle Group, Slider, Combobox</h2>
      <div className="flex flex-col gap-3">
        {(["default", "outline"] as const).map((variant) => (
          <div key={variant} className="flex flex-wrap items-center gap-3">
            <span className="w-28 text-caption text-muted-foreground">toggle {variant}</span>
            {sizes.map((size) => (
              <Toggle key={size} variant={variant} size={size} data-specimen={`toggle-${variant}-${size}`}>Toggle</Toggle>
            ))}
            <Toggle variant={variant} defaultPressed data-specimen={`toggle-${variant}-pressed`}>Pressed</Toggle>
            <Toggle variant={variant} aria-label="Bold" data-specimen={`toggle-${variant}-icon`}><Icon name="star" /></Toggle>
            <Toggle variant={variant} disabled data-specimen={`toggle-${variant}-disabled`}>Disabled</Toggle>
            <Toggle variant={variant} aria-invalid="true" data-specimen={`toggle-${variant}-invalid`}>Invalid</Toggle>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <ToggleGroup variant="outline" defaultValue={["quarter"]} data-specimen="tg-joined-outline">
            <ToggleGroupItem value="month">Month</ToggleGroupItem>
            <ToggleGroupItem value="quarter">Quarter</ToggleGroupItem>
            <ToggleGroupItem value="year">Year</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup defaultValue={["bar"]} data-specimen="tg-joined-default">
            <ToggleGroupItem value="bar" aria-label="Bar chart"><Icon name="bar-chart" /></ToggleGroupItem>
            <ToggleGroupItem value="line" aria-label="Line chart"><Icon name="chart-line" /></ToggleGroupItem>
            <ToggleGroupItem value="pie" aria-label="Pie chart" disabled><Icon name="pie-chart" /></ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup variant="outline" size="sm" spacing={2} multiple defaultValue={["jkt", "sby"]} data-specimen="tg-spacing">
            <ToggleGroupItem value="jkt">Jakarta</ToggleGroupItem>
            <ToggleGroupItem value="sby">Surabaya</ToggleGroupItem>
            <ToggleGroupItem value="bdg">Bandung</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup variant="outline" orientation="vertical" defaultValue={["top"]} data-specimen="tg-vertical">
            <ToggleGroupItem value="top">Top 10</ToggleGroupItem>
            <ToggleGroupItem value="all">All cities</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <div className="grid max-w-md gap-6">
        <Slider defaultValue={[40]} aria-label="Reach" data-specimen="slider-single">
          <SliderLabel>Reach target</SliderLabel>
          <SliderValue />
        </Slider>
        <Slider defaultValue={[20, 80]} thumbLabels={["Minimum", "Maximum"]} data-specimen="slider-range">
          <SliderLabel>Range</SliderLabel>
          <SliderValue />
        </Slider>
        <Slider defaultValue={[60]} disabled aria-label="Disabled" data-specimen="slider-disabled" />
        <div className="h-40">
          <Slider defaultValue={[30]} orientation="vertical" aria-label="Vertical" data-specimen="slider-vertical" />
        </div>
      </div>
      <div className="grid max-w-md gap-6">
        <Field>
          <FieldLabel htmlFor="cb-a">City</FieldLabel>
          <Combobox items={CITY_LIST} defaultValue="Bandung">
            <ComboboxInput id="cb-a" placeholder="Select a city" data-specimen="cb-single" />
            {cbList(CITY_LIST)}
          </Combobox>
          <FieldDescription>Type to filter. The clear button shows once a city is chosen.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="cb-b">Cities (multiple)</FieldLabel>
          <Combobox multiple items={CITY_LIST} defaultValue={["Jakarta", "Surabaya"]}>
            <ComboboxChips ref={anchor} data-specimen="cb-chips">
              <ComboboxValue>
                {(values: string[]) => (
                  <>
                    {values.map((v) => (
                      <ComboboxChip key={v}>{v}</ComboboxChip>
                    ))}
                    <ComboboxChipsInput id="cb-b" placeholder="Add city" />
                  </>
                )}
              </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
              <ComboboxEmpty>No results</ComboboxEmpty>
              <ComboboxList>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>
        <Field>
          <FieldLabel htmlFor="cb-c">Team</FieldLabel>
          <Combobox items={["Roadside", "Transit"]}>
            <ComboboxInput id="cb-c" aria-invalid="true" placeholder="Select a team" data-specimen="cb-invalid" />
            {cbList(["Roadside", "Transit"])}
          </Combobox>
          <FieldError>Choose a team.</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="cb-d">Region</FieldLabel>
          <Combobox items={["Java", "Bali"]} defaultValue="Java" disabled>
            <ComboboxInput id="cb-d" disabled placeholder="Select a region" data-specimen="cb-disabled" />
            {cbList(["Java", "Bali"])}
          </Combobox>
        </Field>
      </div>
    </section>
  )
}

function OverlaysSection() {
  const sides = ["right", "left", "top", "bottom"] as const
  return (
    <section id="overlays" className="flex flex-col gap-6">
      <h2 className="text-h2 text-ink-heading">Overlays: Alert Dialog, Sheet, Popover, Tooltip</h2>
      <div className="flex flex-wrap items-center gap-3">
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline" data-specimen="ad-trigger-default" />}>Delete report</AlertDialogTrigger>
          <AlertDialogContent data-specimen="ad-default">
            <AlertDialogHeader>
              <AlertDialogMedia><Icon name="trash" /></AlertDialogMedia>
              <AlertDialogTitle>Delete this report?</AlertDialogTitle>
              <AlertDialogDescription>This removes the report and its shared links. You can't undo it.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive">Delete report</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline" data-specimen="ad-trigger-sm" />}>Small alert dialog</AlertDialogTrigger>
          <AlertDialogContent size="sm" data-specimen="ad-sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Discard changes?</AlertDialogTitle>
              <AlertDialogDescription>Your edits are not saved.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep editing</AlertDialogCancel>
              <AlertDialogAction variant="destructive">Discard</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {sides.map((side) => (
          <Sheet key={side}>
            <SheetTrigger render={<Button variant="outline" data-specimen={`sheet-trigger-${side}`} />}>Sheet {side}</SheetTrigger>
            <SheetContent side={side} data-specimen={`sheet-${side}`}>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Choose the period and the cities.</SheetDescription>
              </SheetHeader>
              <div className="px-6 text-body-sm">Sheet body</div>
              <SheetFooter>
                <Button variant="outline">Reset</Button>
                <Button>Apply</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ))}
        <Popover>
          <PopoverTrigger render={<Button variant="outline" data-specimen="pop-trigger" />}>Open popover</PopoverTrigger>
          <PopoverContent data-specimen="pop">
            <PopoverHeader>
              <PopoverTitle>Report period</PopoverTitle>
              <PopoverDescription>Figures cover Q1 to Q3 2025 in 25 cities.</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Add" data-specimen="tip-trigger" />}><Icon name="plus" /></TooltipTrigger>
            <TooltipContent data-specimen="tip">Add a report</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </section>
  )
}

function MenusSection() {
  return (
    <section id="menus" className="flex flex-col gap-6">
      <h2 className="text-h2 text-ink-heading">Menus: Dropdown Menu, Context Menu, Hover Card</h2>
      <div className="flex flex-wrap items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" data-specimen="dd-trigger" />}>Report actions</DropdownMenuTrigger>
          <DropdownMenuContent data-specimen="dd">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Report</DropdownMenuLabel>
              <DropdownMenuItem><Icon name="edit" />Edit<DropdownMenuShortcut>Cmd E</DropdownMenuShortcut></DropdownMenuItem>
              <DropdownMenuItem><Icon name="download" />Download</DropdownMenuItem>
              <DropdownMenuItem disabled>Archive</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>Show totals</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={false}>Show deltas</DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value="quarter">
              <DropdownMenuRadioItem value="month">Month</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="quarter">Quarter</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Copy link</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive"><Icon name="trash" />Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ContextMenu>
          <ContextMenuTrigger render={<div className="flex h-24 w-56 items-center justify-center rounded-lg border border-dashed border-border text-body-sm text-muted-foreground" data-specimen="cm-trigger" />}>
            Right-click here
          </ContextMenuTrigger>
          <ContextMenuContent data-specimen="cm">
            <ContextMenuGroup>
              <ContextMenuLabel>City</ContextMenuLabel>
            </ContextMenuGroup>
            <ContextMenuItem>Open<ContextMenuShortcut>Enter</ContextMenuShortcut></ContextMenuItem>
            <ContextMenuItem disabled>Compare</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive">Remove</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <HoverCard>
          <HoverCardTrigger render={<Button variant="link" data-specimen="hc-trigger" />}>@playlog</HoverCardTrigger>
          <HoverCardContent data-specimen="hc">
            <p className="text-label text-ink-heading">Playlog</p>
            <p className="text-body-sm text-muted-foreground">Out-of-home audience analytics for 25 Indonesian cities.</p>
          </HoverCardContent>
        </HoverCard>
      </div>
    </section>
  )
}

function ToastSection() {
  return (
    <section id="toast" className="flex flex-col gap-6">
      <h2 className="text-h2 text-ink-heading">Toast</h2>
      <Toaster />
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" data-specimen="toast-default" onClick={() => toast("Report saved")}>Default</Button>
        <Button variant="outline" data-specimen="toast-success" onClick={() => toast.success("Export ready", { description: "Q3 roadside reach.csv, 2,4 MB" })}>Success</Button>
        <Button variant="outline" data-specimen="toast-info" onClick={() => toast.info("New data available", { description: "September figures for 25 cities." })}>Info</Button>
        <Button variant="outline" data-specimen="toast-warning" onClick={() => toast.warning("Partial data", { description: "Medan has no figures for August." })}>Warning</Button>
        <Button variant="outline" data-specimen="toast-error" onClick={() => toast.error("Export failed", { description: "The file is too large. Narrow the period and try again." })}>Error</Button>
      </div>
    </section>
  )
}

function NavSection() {
  const reports = [
    ["Reach", "Share of adults who saw the campaign."],
    ["Frequency", "Average exposures per person."],
    ["Impressions", "Total exposures by city."],
    ["Audience", "Who passed the screens."],
  ]
  return (
    <section id="nav" className="flex flex-col gap-6">
      <h2 className="text-h2 text-ink-heading">Navigation: Tabs, Breadcrumb, Pagination, Navigation Menu</h2>
      <div className="flex flex-col gap-6">
        <Tabs defaultValue="overview" data-specimen="tabs-default">
          <TabsList data-specimen="tabs-list-default">
            <TabsTrigger value="overview" data-specimen="tab-default-active">Overview</TabsTrigger>
            <TabsTrigger value="cities" data-specimen="tab-default-idle">Cities</TabsTrigger>
            <TabsTrigger value="export" disabled data-specimen="tab-default-disabled">Export</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">Overview panel</TabsContent>
          <TabsContent value="cities">Cities panel</TabsContent>
        </Tabs>
        <Tabs defaultValue="overview">
          <TabsList variant="line" data-specimen="tabs-list-line">
            <TabsTrigger value="overview" data-specimen="tab-line-active">Overview</TabsTrigger>
            <TabsTrigger value="cities" data-specimen="tab-line-idle">Cities</TabsTrigger>
            <TabsTrigger value="export" disabled data-specimen="tab-line-disabled">Export</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">Overview panel</TabsContent>
          <TabsContent value="cities">Cities panel</TabsContent>
        </Tabs>
        <Tabs defaultValue="overview" orientation="vertical">
          <TabsList variant="line" data-specimen="tabs-list-vertical">
            <TabsTrigger value="overview" data-specimen="tab-vertical-active">Overview</TabsTrigger>
            <TabsTrigger value="cities" data-specimen="tab-vertical-idle">Cities</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">Overview panel</TabsContent>
          <TabsContent value="cities">Cities panel</TabsContent>
        </Tabs>
      </div>
      <Breadcrumb data-specimen="breadcrumb">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="#">Reports</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Roadside reach</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Pagination data-specimen="pagination">
        <PaginationContent>
          <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
          <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
          <PaginationItem><PaginationEllipsis /></PaginationItem>
          <PaginationItem><PaginationLink href="#">12</PaginationLink></PaginationItem>
          <PaginationStatus page={2} pageCount={12} />
          <PaginationItem><PaginationNext href="#" /></PaginationItem>
        </PaginationContent>
      </Pagination>
      <NavigationMenu data-specimen="navmenu">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger data-specimen="nm-trigger">Reports</NavigationMenuTrigger>
            <NavigationMenuContent data-specimen="nm-content">
              <ul className="grid w-96 grid-cols-2 gap-1">
                {reports.map(([t, d]) => (
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
                  <li key={c}><NavigationMenuLink href="#">{c}</NavigationMenuLink></li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" active className={navigationMenuTriggerStyle()} data-specimen="nm-active">Dashboard</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()} data-specimen="nm-link">Docs</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </section>
  )
}

type Cmd = { value: string; label: string; icon: "chart-line" | "bar-chart" | "download" | "trash"; shortcut?: string; disabled?: boolean }
const COMMANDS: { value: string; items: Cmd[] }[] = [
  { value: "Reports", items: [
    { value: "Reach", label: "Reach", icon: "chart-line" },
    { value: "Frequency", label: "Frequency", icon: "bar-chart", shortcut: "Cmd F" },
  ] },
  { value: "Actions", items: [
    { value: "Export", label: "Export", icon: "download", shortcut: "Cmd E" },
    { value: "Delete", label: "Delete", icon: "trash", disabled: true },
  ] },
]

function CommandBody({ groups }: { groups: typeof COMMANDS }) {
  return (
    <Command items={groups} onSelect={() => {}}>
      <CommandInput placeholder="Search commands" data-specimen="command-input" />
      <CommandEmpty>No results</CommandEmpty>
      <CommandList data-specimen="command-list">
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

function MenubarCommandSection() {
  const [open, setOpen] = React.useState(false)
  return (
    <section id="menubar-command" className="flex flex-col gap-6">
      <h2 className="text-h2 text-ink-heading">Menubar and Command</h2>
      <Menubar className="w-fit" data-specimen="menubar">
        <MenubarMenu>
          <MenubarTrigger data-specimen="mb-trigger">File</MenubarTrigger>
          <MenubarContent data-specimen="mb-content">
            <MenubarGroup>
              <MenubarLabel>Report</MenubarLabel>
              <MenubarItem><Icon name="edit" />Rename<MenubarShortcut>Cmd R</MenubarShortcut></MenubarItem>
              <MenubarItem disabled>Archive</MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarCheckboxItem checked>Show totals</MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarRadioGroup value="quarter">
              <MenubarRadioItem value="month">Month</MenubarRadioItem>
              <MenubarRadioItem value="quarter">Quarter</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Email</MenubarItem>
                <MenubarItem>Copy link</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem variant="destructive"><Icon name="trash" />Delete</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger data-specimen="mb-trigger-2">View</MenubarTrigger>
          <MenubarContent><MenubarItem>Zoom in</MenubarItem><MenubarItem>Zoom out</MenubarItem></MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger disabled data-specimen="mb-trigger-disabled">Help</MenubarTrigger>
          <MenubarContent><MenubarItem>Docs</MenubarItem></MenubarContent>
        </MenubarMenu>
      </Menubar>
      <div className="max-w-md" data-specimen="command-wrap">
        <CommandBody groups={COMMANDS} />
      </div>
      <div>
        <Button variant="outline" data-specimen="cmd-open" onClick={() => setOpen(true)}>Open command palette</Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandBody groups={COMMANDS.slice(0, 1).map((g) => ({ ...g, items: g.items.slice(0, 1) }))} />
        </CommandDialog>
      </div>
    </section>
  )
}

function DialogSection() {
  return (
    <section id="dialog" className="flex flex-col gap-6">
      <h2 className="text-h2 text-ink-heading">Dialog</h2>
      <div className="flex flex-wrap items-center gap-3">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" data-specimen="dialog-trigger-default" />}>
            Edit report
          </DialogTrigger>
          <DialogContent data-specimen="dialog-default">
            <DialogHeader>
              <DialogTitle>Edit report</DialogTitle>
              <DialogDescription>Change the name and period. Figures update after you save.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-1.5">
              <Label htmlFor="dlg-name">Report name</Label>
              <Input id="dlg-name" defaultValue="Roadside reach Q1" />
            </div>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
              <Button>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger render={<Button variant="outline" data-specimen="dialog-trigger-no-close" />}>
            Without close button
          </DialogTrigger>
          <DialogContent showCloseButton={false} data-specimen="dialog-no-close">
            <DialogHeader>
              <DialogTitle>Share report</DialogTitle>
              <DialogDescription>Anyone with the link can view this report.</DialogDescription>
            </DialogHeader>
            <DialogFooter showCloseButton>
              <Button>Copy link</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

function SidebarSection() {
  return (

  <section id="sidebar" className="flex flex-col gap-6">
    <h2 className="text-h2 text-ink-heading">Sidebar</h2>

    {/* Static: collapsible="none", every part in flow so styles can be compared. */}
    <div className="h-[760px] w-fit" data-specimen="sidebar-static-wrap">
      <SidebarProvider className="h-full min-h-0 w-fit">
        <Sidebar collapsible="none" className="border-r-(length:--pl-border-width) border-sidebar-border" data-specimen="sidebar-static">
          <SidebarHeader data-specimen="sb-header">
            <SidebarInput placeholder="Search" data-specimen="sb-input" />
          </SidebarHeader>
          <SidebarContent data-specimen="sb-content">
            <SidebarGroup data-specimen="sb-group">
              <SidebarGroupLabel data-specimen="sb-group-label">Reports</SidebarGroupLabel>
              <SidebarGroupAction aria-label="Add report" data-specimen="sb-group-action"><Icon name="plus" /></SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton data-specimen="sb-item"><Icon name="home" /><span>Overview</span></SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem data-specimen="sb-item-active-wrap">
                    <SidebarMenuButton isActive data-specimen="sb-item-active"><Icon name="chart-line" /><span>Reach</span></SidebarMenuButton>
                    <SidebarMenuBadge data-specimen="sb-badge">12</SidebarMenuBadge>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton data-specimen="sb-item-action"><Icon name="bar-chart" /><span>Frequency</span></SidebarMenuButton>
                    <SidebarMenuAction aria-label="More" data-specimen="sb-action"><Icon name="more" /></SidebarMenuAction>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton size="sm" data-specimen="sb-item-sm"><Icon name="clock" /><span>Recent</span></SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton size="lg" data-specimen="sb-item-lg"><Icon name="star" /><span>Starred</span></SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton variant="outline" data-specimen="sb-item-outline"><Icon name="folder" /><span>Folders</span></SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton disabled data-specimen="sb-item-disabled"><Icon name="database" /><span>Sources</span></SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton data-specimen="sb-item-parent"><Icon name="settings" /><span>Settings</span></SidebarMenuButton>
                    <SidebarMenuSub data-specimen="sb-sub">
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" isActive data-specimen="sb-sub-active"><span>Profile</span></SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" data-specimen="sb-sub-item"><span>Billing</span></SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" size="sm" data-specimen="sb-sub-sm"><span>Team</span></SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator data-specimen="sb-separator" />
            <SidebarGroup>
              <SidebarGroupLabel>Loading</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem><SidebarMenuSkeleton showIcon data-specimen="sb-skeleton" /></SidebarMenuItem>
                  <SidebarMenuItem><SidebarMenuSkeleton /></SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter data-specimen="sb-footer">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton><Icon name="users" /><span>Account</span></SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </div>

    {/* Interactive: collapsible="icon" inside a transformed box so the fixed sidebar stays in the box. */}
    <div className="relative h-96 overflow-hidden border border-border [transform:translateZ(0)]" data-specimen="sidebar-demo-wrap">
      <SidebarProvider className="h-full min-h-0">
        <Sidebar collapsible="icon" className="h-full" data-specimen="sidebar-demo">
          <SidebarHeader>
            <SidebarTrigger data-specimen="sb-trigger" />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Reports</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive tooltip="Reach" data-specimen="sb-demo-item"><Icon name="chart-line" /><span>Reach</span></SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Frequency"><Icon name="bar-chart" /><span>Frequency</span></SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <SidebarInset className="p-6">
          <p className="text-body-sm">Page content. Press Cmd or Ctrl B to toggle the sidebar.</p>
        </SidebarInset>
      </SidebarProvider>
    </div>
  </section>
  )
}

const badgeVariants = ["default", "secondary", "destructive", "info", "success", "warning", "accent", "outline", "ghost", "link"] as const
const alertVariants = ["default", "info", "success", "warning", "destructive"] as const

function DisplaySection() {
  return (

  <section id="display" className="flex flex-col gap-6">
    <h2 className="text-h2 text-ink-heading">Display: Badge, Alert, Card, StatCard</h2>

    <div className="flex flex-wrap items-center gap-3">
      {badgeVariants.map((variant) => (
        <Badge key={variant} variant={variant} data-specimen={`badge-${variant}`}>{variant}</Badge>
      ))}
    </div>
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="success" data-specimen="badge-icon"><Icon name="check" />Live</Badge>
      <Badge variant="info" aria-disabled="true" data-specimen="badge-disabled">Disabled</Badge>
      <Badge variant="secondary" aria-invalid="true" data-specimen="badge-invalid">Invalid</Badge>
      <Badge render={<a href="#display" />} variant="outline" data-specimen="badge-link">As link</Badge>
    </div>

    <div className="flex max-w-xl flex-col gap-3">
      {alertVariants.map((variant) => (
        <Alert key={variant} variant={variant} data-specimen={`alert-${variant}`}>
          <Icon name="info" />
          <AlertTitle>{variant} alert</AlertTitle>
          <AlertDescription>Figures update after you save the report.</AlertDescription>
        </Alert>
      ))}
      <Alert variant="info" data-specimen="alert-no-icon">
        <AlertTitle>No icon</AlertTitle>
        <AlertDescription>Text only alert.</AlertDescription>
      </Alert>
      <Alert variant="warning" data-specimen="alert-action">
        <Icon name="warning" />
        <AlertTitle>With action</AlertTitle>
        <AlertDescription>Coverage is below target.</AlertDescription>
        <AlertAction><Button size="xs" variant="outline">Review</Button></AlertAction>
      </Alert>
    </div>

    <div className="flex flex-wrap items-start gap-4">
      <Card className="w-80" data-specimen="card-default">
        <CardHeader data-specimen="card-header">
          <CardTitle data-specimen="card-title">Roadside reach</CardTitle>
          <CardDescription data-specimen="card-description">Q1 2025, 25 cities</CardDescription>
          <CardAction data-specimen="card-action"><Button size="sm" variant="outline">Export</Button></CardAction>
        </CardHeader>
        <CardContent data-specimen="card-content"><p>Reach grew in every city.</p></CardContent>
        <CardFooter data-specimen="card-footer"><Button size="sm">Open report</Button></CardFooter>
      </Card>
      <Card size="sm" className="w-80" data-specimen="card-sm">
        <CardHeader>
          <CardTitle data-specimen="card-sm-title">Dense card</CardTitle>
          <CardDescription>Small size</CardDescription>
        </CardHeader>
        <CardContent><p>Content</p></CardContent>
      </Card>
    </div>

    <div className="grid max-w-3xl grid-cols-3 gap-4">
      <StatCard label="Impressions" value="1,204,000" delta="+8,2%" trend="good" footer="Q1–Q3 2025 · 25 cities" icon={<Icon name="chart-line" />} data-specimen="stat-good" />
      <StatCard label="Frequency" value="3,4" delta="-1,1%" trend="bad" footer="Per person" data-specimen="stat-bad" />
      <StatCard label="Reach" value="62%" delta="0,0%" data-specimen="stat-neutral" />
      <StatCard label="No footer" value="18" data-specimen="stat-bare" />
    </div>
  </section>
  )
}

const avatarSizes = ["sm", "default", "lg"] as const
const photo = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><rect width='40' height='40' fill='%23004d9f'/></svg>"

function Display2Section() {
  return (

  <section id="display2" className="flex flex-col gap-6">
    <h2 className="text-h2 text-ink-heading">Display: Table, Avatar, Progress, Spinner</h2>

    <div className="flex max-w-2xl flex-col gap-6">
      <Table data-specimen="table-default">
        <TableCaption data-specimen="table-caption">Reach by city, Q1 2025</TableCaption>
        <TableHeader data-specimen="table-header">
          <TableRow>
            <TableHead data-specimen="table-head">City</TableHead>
            <TableHead numeric data-specimen="table-head-numeric">Reach</TableHead>
            <TableHead numeric>Frequency</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody data-specimen="table-body">
          <TableRow data-specimen="table-row">
            <TableCell data-specimen="table-cell">Jakarta</TableCell>
            <TableCell numeric data-specimen="table-cell-numeric">1,204,000</TableCell>
            <TableCell numeric>3,4</TableCell>
          </TableRow>
          <TableRow data-state="selected" data-specimen="table-row-selected">
            <TableCell>Bandung</TableCell>
            <TableCell numeric>640,500</TableCell>
            <TableCell numeric>2,9</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Surabaya</TableCell>
            <TableCell numeric>588,120</TableCell>
            <TableCell numeric>3,1</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter data-specimen="table-footer">
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell numeric>2,432,620</TableCell>
            <TableCell numeric>3,1</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Table dense data-specimen="table-dense">
        <TableBody>
          <TableRow>
            <TableCell data-specimen="table-dense-cell">Jakarta</TableCell>
            <TableCell numeric>1,204,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bandung</TableCell>
            <TableCell numeric>640,500</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div className="flex flex-wrap items-center gap-4">
      {avatarSizes.map((size) => (
        <Avatar key={size} size={size} data-specimen={`avatar-${size}`}>
          <AvatarFallback data-specimen={`avatar-fallback-${size}`}>SC</AvatarFallback>
        </Avatar>
      ))}
      <Avatar data-specimen="avatar-image">
        <AvatarImage src={photo} alt="Sample" data-specimen="avatar-img" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      {avatarSizes.map((size) => (
        <Avatar key={`b-${size}`} size={size} data-specimen={`avatar-badge-${size}`}>
          <AvatarFallback>AB</AvatarFallback>
          <AvatarBadge data-specimen={`avatar-dot-${size}`}><span className="sr-only">Online</span></AvatarBadge>
        </Avatar>
      ))}
      <AvatarGroup data-specimen="avatar-group">
        <Avatar><AvatarFallback>SC</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
        <AvatarGroupCount data-specimen="avatar-group-count">+3</AvatarGroupCount>
      </AvatarGroup>
    </div>

    <div className="flex max-w-md flex-col gap-4">
      <Progress value={40} data-specimen="progress-40">
        <ProgressLabel data-specimen="progress-label">Reach</ProgressLabel>
        <ProgressValue data-specimen="progress-value" />
      </Progress>
      <Progress value={0} data-specimen="progress-0">
        <ProgressLabel>Frequency</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={100} data-specimen="progress-100" />
    </div>

    <div className="flex items-center gap-4">
      <Spinner data-specimen="spinner" />
      <Spinner className="size-6 text-muted-foreground" data-specimen="spinner-large" />
    </div>
  </section>
  )
}

const itemVariants = ["default", "outline", "muted"] as const
const itemSizes = ["default", "sm", "xs"] as const

function Display3Section() {
  return (

  <section id="display3" className="flex flex-col gap-6">
    <h2 className="text-h2 text-ink-heading">Display: Accordion, Collapsible, Empty, Item</h2>

    <Accordion className="max-w-md" defaultValue={["a"]} data-specimen="accordion">
      <AccordionItem value="a" data-specimen="accordion-item">
        <AccordionTrigger data-specimen="accordion-trigger-open">What is reach?</AccordionTrigger>
        <AccordionContent data-specimen="accordion-content">The share of the audience that saw the ad at least once.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger data-specimen="accordion-trigger">What is frequency?</AccordionTrigger>
        <AccordionContent>The average number of times each person saw it.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="c" disabled>
        <AccordionTrigger data-specimen="accordion-trigger-disabled">Disabled item</AccordionTrigger>
        <AccordionContent>Hidden.</AccordionContent>
      </AccordionItem>
    </Accordion>

    <Collapsible className="max-w-md" defaultOpen data-specimen="collapsible">
      <CollapsibleTrigger render={<Button variant="outline" data-specimen="collapsible-trigger" />}>Toggle details</CollapsibleTrigger>
      <CollapsibleContent data-specimen="collapsible-content">
        <p className="pt-3 text-body-sm">Figures update after you save the report.</p>
      </CollapsibleContent>
    </Collapsible>

    <div className="max-w-xl rounded-lg border border-border bg-card" data-specimen="empty-wrap">
      <Empty data-specimen="empty">
        <EmptyHeader data-specimen="empty-header">
          <EmptyMedia variant="icon" data-specimen="empty-media"><Icon name="folder" /></EmptyMedia>
          <EmptyTitle data-specimen="empty-title">No reports yet</EmptyTitle>
          <EmptyDescription data-specimen="empty-description">Create a report to see reach and frequency here.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent data-specimen="empty-content">
          <Button>Create report</Button>
          <Button variant="outline">Import</Button>
        </EmptyContent>
      </Empty>
    </div>

    <div className="flex max-w-xl flex-col gap-6">
      <ItemGroup data-specimen="item-group">
        {itemVariants.flatMap((variant) =>
          itemSizes.map((size) => (
            <Item key={`${variant}-${size}`} variant={variant} size={size} data-specimen={`item-${variant}-${size}`}>
              <ItemMedia variant="icon" data-specimen={`item-media-${variant}-${size}`}><Icon name="chart-line" /></ItemMedia>
              <ItemContent>
                <ItemTitle data-specimen={`item-title-${variant}-${size}`}>Roadside reach</ItemTitle>
                <ItemDescription data-specimen={`item-description-${variant}-${size}`}>Q1 2025, 25 cities</ItemDescription>
              </ItemContent>
              <ItemActions><Button size="sm" variant="outline">Open</Button></ItemActions>
            </Item>
          ))
        )}
      </ItemGroup>
      <ItemGroup data-specimen="item-group-2">
        <Item render={<a href="#display3" />} variant="outline" data-specimen="item-link">
          <ItemMedia variant="image" data-specimen="item-media-image"><span className="size-full bg-primary" /></ItemMedia>
          <ItemContent><ItemTitle>As link</ItemTitle></ItemContent>
        </Item>
        <Item render={<a href="#display3" />} data-selected="true" data-specimen="item-selected">
          <ItemMedia variant="icon"><Icon name="star" /></ItemMedia>
          <ItemContent><ItemTitle>Selected</ItemTitle></ItemContent>
        </Item>
        <Item render={<button type="button" disabled />} data-specimen="item-disabled">
          <ItemContent><ItemTitle>Disabled button</ItemTitle></ItemContent>
        </Item>
        <ItemSeparator data-specimen="item-separator" />
        <Item variant="outline" data-specimen="item-header-footer">
          <ItemHeader data-specimen="item-header"><ItemTitle>Header</ItemTitle></ItemHeader>
          <ItemContent><ItemDescription>Body text</ItemDescription></ItemContent>
          <ItemFooter data-specimen="item-footer"><ItemDescription>Footer</ItemDescription></ItemFooter>
        </Item>
      </ItemGroup>
    </div>
  </section>
  )
}

const scrollRows = Array.from({ length: 20 }, (_, i) => `Report ${i + 1}`)

function Display4Section() {
  const rows = scrollRows
  return (

  <section id="display4" className="flex flex-col gap-6">
    <h2 className="text-h2 text-ink-heading">Display: Kbd, Scroll Area, Aspect Ratio, Button Group</h2>

    <div className="flex flex-wrap items-center gap-4">
      <Kbd data-specimen="kbd">K</Kbd>
      <KbdGroup data-specimen="kbd-group"><Kbd data-specimen="kbd-in-group">Ctrl</Kbd><Kbd>B</Kbd></KbdGroup>
      <Kbd data-specimen="kbd-icon"><Icon name="search" />Search</Kbd>
    </div>

    <div className="flex flex-wrap items-start gap-6">
      <ScrollArea className="h-48 w-56 rounded-md border border-border" data-specimen="scroll-area">
        <div className="p-3" data-specimen="scroll-content">
          {rows.map((row) => (
            <p key={row} className="py-1 text-body-sm">{row}</p>
          ))}
        </div>
      </ScrollArea>
      <ScrollArea className="h-24 w-56 rounded-md border border-border" data-specimen="scroll-area-h">
        <div className="w-[480px] p-3 text-body-sm whitespace-nowrap">A wide line of content that overflows the box sideways.</div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <ScrollArea className="h-24 w-56 rounded-md border border-border" data-specimen="scroll-area-short">
        <div className="p-3 text-body-sm">Fits, no bar.</div>
      </ScrollArea>
    </div>

    <div className="flex flex-wrap items-start gap-4">
      <AspectRatio ratio={16 / 9} className="w-64 bg-muted" data-specimen="aspect-wide"><span className="p-2 text-body-sm">16:9</span></AspectRatio>
      <AspectRatio ratio={1} className="w-32 bg-muted" data-specimen="aspect-square"><span className="p-2 text-body-sm">1:1</span></AspectRatio>
    </div>

    <div className="flex flex-wrap items-start gap-6">
      <ButtonGroup data-specimen="bg-outline">
        <Button variant="outline" data-specimen="bg-outline-first">Day</Button>
        <Button variant="outline">Week</Button>
        <Button variant="outline" data-specimen="bg-outline-last">Month</Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical" data-specimen="bg-vertical">
        <Button variant="outline">Day</Button>
        <Button variant="outline">Week</Button>
        <Button variant="outline">Month</Button>
      </ButtonGroup>
      <ButtonGroup data-specimen="bg-filled">
        <Button>Save</Button>
        <ButtonGroupSeparator data-specimen="bg-separator" />
        <Button>Save as</Button>
      </ButtonGroup>
      <ButtonGroup data-specimen="bg-text">
        <ButtonGroupText data-specimen="bg-text-label">https://</ButtonGroupText>
        <Input placeholder="playlog.com" data-specimen="bg-input" />
        <Button variant="outline">Go</Button>
      </ButtonGroup>
      <ButtonGroup data-specimen="bg-nested">
        <ButtonGroup><Button variant="outline">A</Button><Button variant="outline">B</Button></ButtonGroup>
        <ButtonGroup><Button variant="outline">C</Button></ButtonGroup>
      </ButtonGroup>
    </div>
  </section>
  )
}

function OtpSection() {
  const [done, setDone] = React.useState("")
  return (

  <section id="otp" className="flex flex-col gap-6">
    <h2 className="text-h2 text-ink-heading">Input OTP</h2>

    <div className="flex flex-col gap-2">
      <Label htmlFor="otp-main">Verification code</Label>
      <InputOTP id="otp-main" length={6} defaultValue="123" data-specimen="otp" onValueComplete={(value) => setDone(String(value))}>
        <InputOTPGroup data-specimen="otp-group">
          <InputOTPSlot data-specimen="otp-slot-filled" /><InputOTPSlot /><InputOTPSlot />
        </InputOTPGroup>
        <InputOTPSeparator data-specimen="otp-separator" />
        <InputOTPGroup>
          <InputOTPSlot data-specimen="otp-slot-empty" /><InputOTPSlot /><InputOTPSlot />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-caption text-muted-foreground" data-specimen="otp-done">Complete: {done}</p>
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="otp-invalid">Invalid</Label>
      <InputOTP id="otp-invalid" length={4} invalid aria-describedby="otp-err" defaultValue="12" data-specimen="otp-invalid">
        <InputOTPGroup><InputOTPSlot data-specimen="otp-slot-invalid" /><InputOTPSlot /><InputOTPSlot /><InputOTPSlot /></InputOTPGroup>
      </InputOTP>
      <p id="otp-err" className="text-caption text-danger-text">The code is not right.</p>
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="otp-disabled">Disabled</Label>
      <InputOTP id="otp-disabled" length={4} disabled defaultValue="12" data-specimen="otp-disabled">
        <InputOTPGroup><InputOTPSlot data-specimen="otp-slot-disabled" /><InputOTPSlot /><InputOTPSlot /><InputOTPSlot /></InputOTPGroup>
      </InputOTP>
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="otp-mask">Masked</Label>
      <InputOTP id="otp-mask" length={4} mask defaultValue="42" data-specimen="otp-mask">
        <InputOTPGroup><InputOTPSlot data-specimen="otp-slot-mask" /><InputOTPSlot /><InputOTPSlot /><InputOTPSlot /></InputOTPGroup>
      </InputOTP>
    </div>
  </section>
  )
}

function DrawerSection() {
  const [saved, setSaved] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  return (
  <section id="drawer" className="flex flex-col gap-6">
    <h2 className="text-h2 text-ink-heading">Drawer</h2>
    <p className="text-caption text-muted-foreground">
      A bottom panel for small screens: swipe down, press Escape, tap the scrim or use the close button. Focus stays inside and returns to the trigger.
    </p>
    <div className="flex flex-wrap items-center gap-3">
      <Drawer>
        <DrawerTrigger render={<Button variant="outline" data-specimen="drawer-trigger" />}>Edit campaign</DrawerTrigger>
        <DrawerContent data-specimen="drawer-edit">
          <DrawerHeader data-specimen="drawer-header">
            <DrawerTitle data-specimen="drawer-title">Edit campaign</DrawerTitle>
            <DrawerDescription data-specimen="drawer-description">Change the name and the daily budget. Reach is recounted overnight.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody data-specimen="drawer-body">
            <div className="flex flex-col gap-4 pb-1">
              <Field>
                <FieldLabel htmlFor="drawer-name">Campaign name</FieldLabel>
                <Input id="drawer-name" defaultValue="Rail network, Q3 2025" />
              </Field>
              <Slider defaultValue={[40]}>
                <SliderLabel>Daily budget</SliderLabel>
                <SliderValue />
              </Slider>
            </div>
          </DrawerBody>
          <DrawerFooter data-specimen="drawer-footer">
            <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
            <DrawerClose render={<Button onClick={() => setSaved(true)} />}>Save changes</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer>
        <DrawerTrigger render={<Button variant="outline" data-specimen="drawer-trigger-long" />}>Long content</DrawerTrigger>
        <DrawerContent data-specimen="drawer-long">
          <DrawerHeader>
            <DrawerTitle>Screens in this campaign</DrawerTitle>
            <DrawerDescription>The list scrolls inside the drawer; the header and footer stay put.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody data-specimen="drawer-body-long">
            <ul className="flex flex-col gap-2 text-body-sm">
              {Array.from({ length: 24 }, (_, i) => (
                <li key={i} className="flex justify-between border-b-(length:--pl-border-width) border-border py-2">
                  <span>Screen SCR-{1001 + i}</span>
                  <span className="text-caption text-muted-foreground">Live</span>
                </li>
              ))}
            </ul>
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer showSwipeHandle={false}>
        <DrawerTrigger render={<Button variant="outline" data-specimen="drawer-trigger-bare" />}>No handle</DrawerTrigger>
        <DrawerContent showCloseButton={false} data-specimen="drawer-bare">
          <DrawerHeader>
            <DrawerTitle>Discard changes?</DrawerTitle>
            <DrawerDescription>Without a handle or a close button; swipe, Escape or the buttons close it.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose render={<Button variant="outline" />}>Keep editing</DrawerClose>
            <DrawerClose render={<Button variant="destructive" />}>Discard</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger render={<Button variant="outline" data-specimen="drawer-trigger-controlled" />}>Controlled</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Controlled drawer</DrawerTitle>
            <DrawerDescription>Opened and closed with v-model:open.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button data-specimen="drawer-controlled-close" onClick={() => setOpen(false)}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <span className="text-caption text-muted-foreground" data-specimen="drawer-state">open: {String(open)}</span>
      {saved && <span className="text-caption text-muted-foreground">Saved</span>}
    </div>
  </section>
  )
}

const TODAY = new Date(2026, 10, 19)
const BOOKED = [new Date(2026, 10, 24), new Date(2026, 10, 25), new Date(2026, 10, 26)]
const isWeekend = { dayOfWeek: [0, 6] }
const dateCard = "w-fit rounded-lg border-(length:--pl-border-width) border-border bg-card"
const idLabels = { labelPrevious: () => "Bulan sebelumnya", labelNext: () => "Bulan berikutnya" }

function DateSection() {
  const [single, setSingle] = React.useState<Date | undefined>(new Date(2026, 10, 12))
  const [range, setRange] = React.useState<DateRange | undefined>({ from: new Date(2026, 10, 10), to: new Date(2026, 10, 17) })
  const [date, setDate] = React.useState<Date | undefined>()
  const [reportRange, setReportRange] = React.useState<DateRange | undefined>({ from: new Date(2026, 10, 13), to: new Date(2026, 10, 19) })
  const [invalidDate, setInvalidDate] = React.useState<Date | undefined>()
  const presets = React.useMemo(() => getDefaultDateRangePresets(TODAY), [])
  return (
  <section id="date" className="flex flex-col gap-4">
    <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">Date</p>
    <h2 className="text-h3 font-bold text-ink-heading">Calendar</h2>
    <p className="text-caption text-muted-foreground">
      The month grid. Monday first. Selected is Primary; today has a 1px Primary border; range ends are Primary and the days between use the selected surface;
      days from the next or previous month are muted; disabled days are 40%.
    </p>
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-caption text-muted-foreground">Single, today is 19 Nov</p>
        <div className={dateCard}><Calendar mode="single" selected={single} onSelect={setSingle} defaultMonth={TODAY} today={TODAY} data-specimen="cal-single" /></div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-caption text-muted-foreground">Range</p>
        <div className={dateCard}><Calendar mode="range" selected={range} onSelect={setRange} defaultMonth={new Date(2026, 10)} today={TODAY} data-specimen="cal-range" /></div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-caption text-muted-foreground">Disabled weekends, booked days struck through</p>
        <div className={dateCard}>
          <Calendar mode="single" defaultMonth={TODAY} today={TODAY} disabled={[isWeekend, ...BOOKED]} modifiers={{ booked: BOOKED }} modifiersClassNames={{ booked: "line-through" }} data-specimen="cal-disabled" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-caption text-muted-foreground">Week numbers, booked days struck through</p>
        <div className={dateCard}>
          <Calendar mode="single" defaultMonth={TODAY} today={TODAY} showWeekNumber disabled={[isWeekend, ...BOOKED]} modifiers={{ booked: BOOKED }} modifiersClassNames={{ booked: "line-through" }} data-specimen="cal-weeks" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-caption text-muted-foreground">Week numbers, range, January</p>
        <div className={dateCard}>
          <Calendar mode="range" defaultMonth={new Date(2027, 0)} today={TODAY} showWeekNumber selected={{ from: new Date(2027, 0, 5), to: new Date(2027, 0, 12) }} data-specimen="cal-weeks-range" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-caption text-muted-foreground">Month and year dropdowns</p>
        <div className={dateCard}>
          <Calendar mode="single" defaultMonth={TODAY} today={TODAY} captionLayout="dropdown" startMonth={new Date(2024, 0)} endMonth={new Date(2028, 11)} data-specimen="cal-dropdown" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-caption text-muted-foreground">Indonesian (id-ID)</p>
        <div className={dateCard}>
          <Calendar mode="single" defaultMonth={TODAY} today={TODAY} locale={idLocale} labels={idLabels} data-specimen="cal-id" />
        </div>
      </div>
    </div>

    <h2 className="text-h3 font-bold text-ink-heading">Date Picker</h2>
    <p className="text-caption text-muted-foreground">
      A button that looks like an Input, with a Popover and the Calendar. Selecting a date closes the popover; Escape closes it too and returns focus to the field.
    </p>
    <div className="grid max-w-3xl gap-6 md:grid-cols-2">
      <Field>
        <FieldLabel htmlFor="dp-launch">Launch date</FieldLabel>
        <DatePicker id="dp-launch" value={date} onValueChange={setDate} minDate={TODAY} calendarProps={{ today: TODAY }} data-specimen="pick-launch" />
        <FieldDescription>The campaign goes live at 00:00 on this day.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="dp-sm">Small, clearable</FieldLabel>
        <DatePicker id="dp-sm" size="sm" clearable defaultValue={new Date(2026, 10, 19)} calendarProps={{ today: TODAY }} data-specimen="pick-sm" />
      </Field>
      <Field>
        <FieldLabel htmlFor="dp-booked">Pick-up day</FieldLabel>
        <DatePicker id="dp-booked" minDate={TODAY} disabledDates={[isWeekend, ...BOOKED]} calendarProps={{ today: TODAY, modifiers: { booked: BOOKED }, modifiersClassNames: { booked: "line-through" } }} data-specimen="pick-booked" />
        <FieldDescription>Weekends and 24 to 26 Nov are not available.</FieldDescription>
      </Field>
      <Field data-invalid>
        <FieldLabel htmlFor="dp-invalid">Report date</FieldLabel>
        <DatePicker id="dp-invalid" invalid={!invalidDate} aria-describedby="dp-invalid-error" value={invalidDate} onValueChange={setInvalidDate} calendarProps={{ today: TODAY }} data-specimen="pick-invalid" />
        {!invalidDate ? <FieldError id="dp-invalid-error">Choose a report date.</FieldError> : null}
      </Field>
      <Field>
        <FieldLabel htmlFor="dp-disabled">Disabled</FieldLabel>
        <DatePicker id="dp-disabled" disabled defaultValue={new Date(2026, 10, 19)} data-specimen="pick-disabled" />
      </Field>
      <Field>
        <FieldLabel htmlFor="dp-id">Tanggal (id-ID)</FieldLabel>
        <DatePicker id="dp-id" locale={idLocale} placeholder="Pilih tanggal" defaultValue={new Date(2026, 10, 19)} calendarProps={{ today: TODAY, labels: idLabels }} data-specimen="pick-id" />
      </Field>
    </div>

    <h2 className="mt-4 text-h4 font-bold text-ink-heading">Date Range Picker</h2>
    <p className="text-caption text-muted-foreground">Two months on wide screens, one on narrow ones. The popover closes when both ends are chosen.</p>
    <div className="grid max-w-3xl gap-6 md:grid-cols-2">
      <Field>
        <FieldLabel htmlFor="dr-report">Report period</FieldLabel>
        <DateRangePicker id="dr-report" value={reportRange} onValueChange={setReportRange} presets={presets} clearable maxDate={TODAY} calendarProps={{ today: TODAY }} data-specimen="range-report" />
        <FieldDescription>Reports cover up to today.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="dr-empty">Empty</FieldLabel>
        <DateRangePicker id="dr-empty" calendarProps={{ today: TODAY }} data-specimen="range-empty" />
      </Field>
    </div>
  </section>
  )
}

function App() {
  const [dark, setDark] = React.useState(false)
  const apply = (value: boolean) => {
    setDark(value)
    document.documentElement.classList.toggle("dark", value)
  }
  React.useEffect(() => {
    apply(new URLSearchParams(location.search).get("theme") === "dark")
  }, [])
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-12 p-6 text-body-sm">
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-h1 text-ink-heading">Playlog UI (React): pilot</h1>
        <Button variant="outline" aria-pressed={dark} onClick={() => apply(!dark)}>
          {dark ? "Dark" : "Light"} mode
        </Button>
      </header>
      <ButtonSection />
      <InputSection />
      <FormsSection />
      <SelectFieldSection />
      <Batch3Section />
      <DialogSection />
      <OverlaysSection />
      <MenusSection />
      <ToastSection />
      <NavSection />
      <MenubarCommandSection />
      <SidebarSection />
      <DisplaySection />
      <Display2Section />
      <Display3Section />
      <Display4Section />
      <OtpSection />
      <DrawerSection />
      <DateSection />
      <ChartsSection />
      <ChatSection />
      <AiSection />
      <AgentSection />
    </main>
  )
}

createRoot(document.getElementById("root")!).render(<App />)
